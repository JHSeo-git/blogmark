import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

import UserIcon from '@/components/__icons/User.Icon';
import Hidden from '@/components/Hidden';
import Input from '@/components/Input';
import OAuthProviderBadge from '@/components/OAuthProviderBadge';
import { loginUrl } from '@/lib/next-auth';
import { getUser } from '@/lib/session';
import { getUTCDateByString } from '@/lib/utils';
import userService from '@/services/user.service';

async function MePage() {
  const user = await getUser();

  if (!user) {
    return redirect(loginUrl);
  }

  const me = await userService.getUserById(user.id);

  if (!me) {
    return notFound();
  }

  return (
    <section className="my-6 max-w-lg mx-auto px-8 flex flex-col items-center">
      <Hidden>
        <h1>Me Info</h1>
      </Hidden>

      <div className="avatar placeholder">
        <div className="w-32 rounded-full bg-base-300 relative">
          {me.image ? (
            <Image
              src={me.image}
              alt={`${me.name} avatar`}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center text-gray-500">
              <UserIcon />
            </div>
          )}
        </div>
      </div>

      <section className="flex gap-4 w-full">
        <div className="stats shadow mt-6">
          <div className="stat">
            <div className="stat-title">아이템</div>
            <div className="stat-value text-primary text-2xl md:text-4xl">{me.itemsCount}</div>
          </div>
        </div>
        <div className="stats shadow mt-6">
          <div className="stat">
            <div className="stat-title">가입날짜</div>
            <div className="stat-value text-2xl md:text-4xl">
              {getUTCDateByString(me.createdAt)}
            </div>
          </div>
        </div>
      </section>

      <div className="divider my-10">내 정보</div>

      <section className="w-full">
        <label className="label">
          <span className="label-text">연결된 OAuth</span>
        </label>
        <div className="flex flex-wrap gap-4">
          {me.providers.map((provider) => (
            <OAuthProviderBadge key={provider} provider={provider} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 w-full mt-4">
        <Input className="w-full" label="이름" type="text" value={me.name ?? undefined} readOnly />
        <Input
          className="w-full"
          label="이메일"
          type="text"
          value={me.email ?? undefined}
          readOnly
        />
      </section>
    </section>
  );
}

export default MePage;
