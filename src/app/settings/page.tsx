"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function SettingsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <PageHeader title="Settings" subtitle="Project-level preferences (demo placeholders)." />

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Workspace" subtitle="Branding and demo environment." />
          <CardBody>
            <div className="flex flex-wrap gap-2">
              <Badge variant="info">TalentScreen AI</Badge>
              <Badge variant="default">Mock API</Badge>
              <Badge variant="default">Redux Toolkit</Badge>
            </div>
            <div className="mt-4 text-sm text-text-muted">
              This screen is included to complete the sidebar route. It can be extended with real preferences later.
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Notifications" subtitle="Toasts and email actions." />
          <CardBody>
            <div className="text-sm text-text-muted">
              Success/error notifications are implemented via React Hot Toast.
            </div>
          </CardBody>
        </Card>
      </div>
    </motion.div>
  );
}

