import GithubIcon from '../__icons/Github.Icon';
import Badge from './Badge';

type Provider = 'github' | 'google';

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
    </>
  );
}

export default OAuthProviderBadge;
