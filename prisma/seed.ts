import { PrismaClient } from '@prisma/client';

const c = console;

const prisma = new PrismaClient();

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

  c.log('🎉 Seed complete\n\n');
  c.log(`      Seed complete account: ${generatedAccount.id}`);
  c.log(`      Seed complete user: ${generatedUser.email}`);
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
