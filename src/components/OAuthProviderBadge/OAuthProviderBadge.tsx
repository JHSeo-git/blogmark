import type { Provider } from '@/types/oauth-provider';

import GithubIcon from '../__icons/Github.Icon';
import GoogleIcon from '../__icons/Google.Icon';
import Badge from './Badge';

function isProvider(value: string): value is Provider {
  return ['github', 'google'].includes(value);
}

interface OAuthProviderBadgeProps {
  provider: string;
}

function OAuthProviderBadge({ provider }: OAuthProviderBadgeProps) {
  if (!isProvider(provider)) {
    return <Badge>{provider}</Badge>;
  }

  return (
    <>
      {provider === 'github' && (
        <Badge>
          <GithubIcon />
        </Badge>
      )}
      {provider === 'google' && (
        <Badge>
          <GoogleIcon />
        </Badge>
      )}
    </>
  );
}

export default OAuthProviderBadge;
