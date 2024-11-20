import React from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useToast } from "../../components/ui/use-toast";
import { Toaster } from "../../components/ui/toaster";

function SettingsModal({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-bold mb-4">Settings</h2>
                {/* Add settings options here */}
                <Button onClick={onClose} className="mt-4">Close</Button>
            </div>
        </div>
    );
}

export default SettingsModal; 