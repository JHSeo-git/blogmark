import FolderHeartIcon from '@/components/__icons/FolderHeart.Icon';
import LoginForm from '@/components/LoginForm';

function LoginPage() {
  return (
    <section className="p-8 flex flex-col items-center space-y-2">
      <FolderHeartIcon />
      <h1 className="mt-2 font-bold text-2xl">Blogmark</h1>
      <p className="text-sm">Enjoy marking a blog!</p>
      <div className="w-full">
        <div className="h-6" />
        <LoginForm />
        <div className="h-10" />
      </div>
    </section>
  );
}

export default LoginPage;
