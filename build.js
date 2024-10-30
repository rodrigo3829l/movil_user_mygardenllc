import { exec } from 'child_process';

exec('vue-tsc --noEmit', (error) => {
  if (error) {
    console.warn('Type checking failed. Continuing with build...');
  }
  exec('vite build', (buildError, stdout, stderr) => {
    if (buildError) {
      console.error(`Build failed: ${stderr}`);
      process.exit(1);
    }
    console.log('Build completed successfully.');
  });
});
