import React, { useState } from 'react';
import { Lock, Globe } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ConnectorItem } from '../types/connector';

export interface OAuthWizardModalProps {
  connector: ConnectorItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (connectorId: string) => void;
}

export const OAuthWizardModal: React.FC<OAuthWizardModalProps> = ({
  connector,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [apiKey, setApiKey] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  if (!connector) return null;

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);

    setTimeout(() => {
      setIsConnecting(false);
      onSuccess(connector.id);
      onClose();
      setStep(1);
    }, 800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Connect ${connector.name}`}
      description={`Authenticate and save encrypted access tokens for ${connector.provider}.`}
      maxWidth="md"
    >
      <form onSubmit={handleConnect} className="space-y-4 mt-2">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 font-bold flex items-center justify-center">
              {connector.name.charAt(0)}
            </div>
            <div>
              <span className="font-bold text-slate-100 block">{connector.name}</span>
              <span className="text-[10px] text-slate-400">Auth Method: {connector.authType}</span>
            </div>
          </div>
          <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] border border-emerald-500/20">
            AES-256 Vault Ready
          </span>
        </div>

        {connector.authType === 'OAuth2' ? (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3">
            <Globe className="w-8 h-8 text-brand-400 mx-auto" />
            <p className="text-xs text-slate-300">
              You will be redirected to <strong>{connector.provider}</strong> to authorize AIFlow Enterprise permissions.
            </p>
          </div>
        ) : (
          <Input
            label="API Key / Secret Token"
            type="password"
            placeholder="Enter credential payload..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
          />
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="glow" type="submit" isLoading={isConnecting} leftIcon={<Lock className="w-4 h-4" />}>
            Authorize & Store Secret
          </Button>
        </div>
      </form>
    </Modal>
  );
};
