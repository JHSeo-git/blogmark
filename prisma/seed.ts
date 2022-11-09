import type { Blog, Item } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const c = console;

const prisma = new PrismaClient();

type SeedItem = Omit<Item, 'id' | 'createdAt' | 'updatedAt'>;
type SeedBlog = Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>;

export async function main() {
  const user = {
    id: 'cla0fho6n0000ok5u70l59szw',
    name: 'Seo Jun Hyung',
    email: 'qnfqnfqnf@gmail.com',
    image: 'https://avatars.githubusercontent.com/u/61136724?v=4',
  };

  const generatedUser = await prisma.user.upsert({
    where: { id: user.id },
    update: { ...user },
    create: { ...user },
  });

  const account = {
    id: 'cla0fho6w0002ok5u36ize7nq',
    userId: 'cla0fho6n0000ok5u70l59szw',
    type: 'oauth',
    provider: 'github',
    providerAccountId: '61136724',
    access_token: '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',
    token_type: 'bearer',
    scope: 'read:user,user:email',
  };

  const generatedAccount = await prisma.account.upsert({
    where: { id: account.id },
    update: { ...account },
    create: { ...account },
  });

  const blogs: SeedBlog[] = [
    {
      domain: 'seonest.net',
      name: 'JHSeo',
      favicon: 'https://seonest.net/favicon.ico',
    },
    {
      domain: 'nhost.io',
      name: 'nhost',
      favicon: 'https://nhost.io/favicon.ico',
    },
  ];

  const blogA = await prisma.blog.upsert({
    where: { domain: blogs[0].domain },
    update: { ...blogs[0] },
    create: { ...blogs[0] },
  });

  const blogB = await prisma.blog.upsert({
    where: { domain: blogs[1].domain },
    update: { ...blogs[1] },
    create: { ...blogs[1] },
  });

  const items: SeedItem[] = [
    {
      userId: generatedUser.id,
      blogId: blogA.id,
      slug: 'next-js-13',
      title: 'Next.js 13',
      description: 'next13 업데이트 확인용',
      thumbnail:
        'https://www.seonest.net/_next/image?url=%2Fpost%2Freact%2Fnext-js-13%2Fthumbnail.png&w=750&q=75',
      url: 'https://www.seonest.net/posts/react/next-js-13',
    },
    {
      userId: generatedUser.id,
      blogId: blogA.id,
      slug: 'esm-typescript',
      title: 'ESM + TypeScript',
      description: 'ES Module System과 TypeScript를 사용하는법',
      thumbnail:
        'https://www.seonest.net/_next/image?url=%2Fpost%2Fjavascript%2Fesm-typescript%2Fthumbnail.png&w=750&q=75',
      url: 'https://www.seonest.net/posts/javascript/esm-typescript',
    },
    {
      userId: generatedUser.id,
      blogId: blogB.id,
      slug: 'nhost-io-based-graphql',
      title: 'nhost.io based GraphQL',
      description: 'GraphQL 기반으로 작동하는 오픈소스 Firebase 대체제',
      thumbnail: 'https://nhost.io/splash.png',
      url: 'https://nhost.io/',
    },
  ];

  const generatedItems = await Promise.all(
    items.map((item) => {
      return prisma.item.upsert({
        where: { slug: item.slug },
        update: { ...item },
        create: { ...item },
      });
    }),
  );

  c.log('🎉 Seed complete\n\n');
  c.log(`      Seed complete account: ${generatedAccount.id}`);
  c.log(`      Seed complete user: ${generatedUser.email}`);
  c.log(`      Seed complete items count: ${generatedItems.length}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
