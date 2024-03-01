import { builder } from '@builder.io/sdk';
import { RenderBuilderContent } from '../../components/builder/builder';

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);
const pageModel = 'page';

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const content = await builder
    // Get the page content from Builder with the specified options
    .get(pageModel, {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: '/' + (props?.params?.page?.join('/') || '')
      },
      // Set prerender to false to return JSON instead of HTML
      prerender: false,
      enrich: true
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={pageModel} />
    </>
  );
}
