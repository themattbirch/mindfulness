import React, { memo, useCallback } from 'react'
import { useForm, UseFormProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { enhancedAnimations } from '../../utils/enhancedAnimations'
import { useOptimization } from '../../hooks/useOptimization'

interface EnhancedFormProps<T extends z.ZodType> {
  schema: T
  onSubmit: (data: z.infer<T>) => Promise<void> | void
  defaultValues?: Partial<z.infer<T>>
  children: (props: {
    register: ReturnType<typeof useForm>['register']
    errors: Record<string, any>
    isSubmitting: boolean
    isDirty: boolean
  }) => React.ReactNode
  className?: string
}

export const EnhancedForm = memo(<T extends z.ZodType>({
  schema,
  onSubmit,
  defaultValues,
  children,
  className = ''
}: EnhancedFormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues
  })

  const { execute: optimizedSubmit } = useOptimization(onSubmit, {
    debounceMs: 300,
    cacheSize: 5
  })

  const handleFormSubmit = useCallback(async (data: z.infer<T>) => {
    try {
      await optimizedSubmit(data)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }, [optimizedSubmit])

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`space-y-4 ${className} ${enhancedAnimations.fadeIn}`}
      noValidate
    >
      {children({
        register,
        errors,
        isSubmitting,
        isDirty
      })}
    </form>
  )
})

EnhancedForm.displayName = 'EnhancedForm'

// Enhanced Form Field Component
interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helper?: string
}

export const FormField = memo(({
  label,
  error,
  helper,
  type = 'text',
  className = '',
  ...props
}: FormFieldProps) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        className={`
          w-full px-3 py-2 border rounded-md
          focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
          ${className}
        `}
        {...props}
      />
      {helper && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{helper}</p>
      )}
      {error && (
        <p className={`text-sm text-red-500 ${enhancedAnimations.slideIn}`}>
          {error}
        </p>
      )}
    </div>
  )
})

FormField.displayName = 'FormField' 