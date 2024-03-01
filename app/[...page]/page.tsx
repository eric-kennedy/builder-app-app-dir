import { Content, fetchOneEntry, isEditing, isPreviewing } from '@builder.io/sdk-react';

const pageModel = 'page';

interface PageProps {
  params: {
    page: string[];
  };
  searchParams: Record<string, string>;
}

export default async function Page(props: PageProps) {
  const urlPath = '/' + (props.params?.page?.join('/') || '');
  const content = await fetchOneEntry({
    options: props.searchParams,
    model: pageModel,
    apiKey: process.env.NEXT_PUBLIC_BUILDER_API_KEY!,
    userAttributes: {
      urlPath
    },
  });

  const canShowContent =
  content || isPreviewing(props.searchParams) || isEditing(props.searchParams);
  if (!canShowContent) {
    return (
      <>
        <h1>404</h1>
        <p>Make sure you have your content published at builder.io.</p>
      </>
    );
  }
  return <Content content={content} apiKey={process.env.NEXT_PUBLIC_BUILDER_API_KEY!} model={'page'} />;
}
