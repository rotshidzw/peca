import { ContactForm } from '@/components/forms/contact-form';

export default function ContactPage() {
  return (
    <div className="container grid gap-10 py-16 lg:grid-cols-[1fr_0.6fr]">
      <div>
        <h1 className="text-3xl font-semibold">Contact the editorial desk</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Whether you have a story lead, partnership request, or editorial feedback, we’ll respond
          within two business days.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
