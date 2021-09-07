import {
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from 'next-sanity';

import { config } from './config';

export const imageBuilder = (source) =>
  createImageUrlBuilder(config).image(source);
export const usePreviewSubscription = createPreviewSubscriptionHook(config);

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {
    types: {
      block(props) {
        switch (props.node.style) {
          case 'h1':
            return <h1 className="t-h-1">{props.children}</h1>;

          default:
            return <p>{props.children}</p>;
        }
      },
    },
  },
});

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);
