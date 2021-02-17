const markTesting = require('@marko/testing-library');
require('@testing-library/jest-dom/extend-expect');
require('@marko/testing-library/cleanup-after-each');
const indexTemplate = require('../app/components/hello/index.marko');

test('contains the text', async () => {
  const { getByText, rerender } = await markTesting.render(indexTemplate);

  // Will find the element within the rendered result from the template.
  expect(getByText('Hello')).toBeInTheDocument();

  // You can also rerender the component if needed.
  await rerender({ name: 'Marko' });

  expect(getByText('Hello')).toBeInTheDocument();
});
