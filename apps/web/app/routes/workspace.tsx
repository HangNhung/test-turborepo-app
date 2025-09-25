import { useState } from "react";
import { Button, Input } from "@repo/ui";

export default function WorkspaceRoute() {
  const [name, setName] = useState("");

  return (
    <div className="flex h-screen items-center justify-center bg-muted">
      <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold tracking-tight">
          Create Workspace
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Give your workspace a name to get started.
        </p>
        <form className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Workspace name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="outline" type="submit" disabled={!name}>
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
