'use client';

import { useState } from 'react';
import { Alert } from '@/components/ui/alert';

export function AlertExamples() {
  const [dismissedWarning, setDismissedWarning] = useState(false);
  const [dismissedDanger, setDismissedDanger] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <Alert variant="info" title="New features available" description="Check the changelog for the latest updates." />
      <Alert variant="success" title="Payment confirmed" description="Your subscription has been activated." />
      {!dismissedWarning && (
        <Alert variant="warning" title="Approaching limit" description="You've used 80% of your storage." onDismiss={() => setDismissedWarning(true)} />
      )}
      {!dismissedDanger && (
        <Alert variant="danger" title="Authentication failed" description="Please check your credentials." onDismiss={() => setDismissedDanger(true)} />
      )}
    </div>
  );
}
