import { animations } from './animations'

export const enhancedAnimations = {
  ...animations,
  // Slide animations with different directions
  slideInFromLeft: 'animate-slideInFromLeft',
  slideInFromRight: 'animate-slideInFromRight',
  slideInFromBottom: 'animate-slideInFromBottom',
  slideOutToLeft: 'animate-slideOutToLeft',
  slideOutToRight: 'animate-slideOutToRight',
  slideOutToBottom: 'animate-slideOutToBottom',

  // Scale animations
  scaleInFast: 'animate-scaleInFast',
  scaleOutFast: 'animate-scaleOutFast',
  scaleInBounce: 'animate-scaleInBounce',
  scaleOutBounce: 'animate-scaleOutBounce',

  // Attention seekers
  wiggle: 'animate-wiggle',
  heartbeat: 'animate-heartbeat',
  float: 'animate-float',
  glow: 'animate-glow',

  // Combined effects
  slideAndFade: 'animate-slideAndFade',
  popAndBounce: 'animate-popAndBounce',
  glowPulse: 'animate-glowPulse',
  
  // State transitions
  loadingPulse: 'animate-loadingPulse',
  successPop: 'animate-successPop',
  errorShake: 'animate-errorShake'
}

// Update tailwind.config.js with these new animations
export const tailwindAnimationConfig = {
  theme: {
    extend: {
      keyframes: {
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(66, 153, 225, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(66, 153, 225, 0.8)' }
        },
        successPop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        errorShake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-5px)' },
          '40%, 80%': { transform: 'translateX(5px)' }
        }
      },
      animation: {
        slideInFromLeft: 'slideInFromLeft 0.5s ease-out',
        slideInFromRight: 'slideInFromRight 0.5s ease-out',
        wiggle: 'wiggle 0.5s ease-in-out',
        heartbeat: 'heartbeat 1.5s ease-in-out',
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        successPop: 'successPop 0.5s ease-out',
        errorShake: 'errorShake 0.5s ease-in-out'
      }
    }
  }
} 