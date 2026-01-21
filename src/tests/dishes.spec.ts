import { test, expect } from '@playwright/test';

test('should have fewer category headers than dishes', async ({ page }) => {
  // Vai alla pagina dei piatti. Dato che la rotta / reindirizza a /dishes,
  // possiamo semplicemente usare /
  await page.goto('/');

  // Attendi che la pagina si carichi completamente, 
  // cercando un elemento che dovrebbe essere presente
  await page.waitForSelector('[role="listitem"]');

  // Conta il numero di elementi h3
  const h3Count = await page.locator('h3').count();

  // Conta il numero di elementi con role="listitem"
  const listItemCount = await page.locator('[role="listitem"]').count();

  // Stampa i conteggi per il debug (opzionale)
  console.log(`Numero di h3: ${h3Count}`);
  console.log(`Numero di listitem: ${listItemCount}`);

  // Verifica che il numero di h3 sia inferiore al numero di listitem
  expect(h3Count).toBeLessThan(listItemCount);
});
