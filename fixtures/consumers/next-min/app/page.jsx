import { Button, Alert, Field } from "@soluciones-alexendros/ds/react";

export default function Page() {
  return (
    <main>
      <h1>next-min</h1>
      <Button label="Save" variant="primary" />
      <Alert tone="info" message="Installed from npm pack tarball." />
      <Field label="Email" id="email" type="email" />
    </main>
  );
}
