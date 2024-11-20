import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useToast } from './ui/use-toast';
import { Toaster } from './ui/toaster';

interface SettingsModalProps {
  onClose: () => void;
}

function SettingsModal({ onClose }: SettingsModalProps) {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully."
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <Card className="w-[400px]">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          {/* Add your settings controls here */}
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}

export default SettingsModal; 