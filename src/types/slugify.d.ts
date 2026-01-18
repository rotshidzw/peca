declare module 'slugify' {
  interface SlugifyOptions {
    [key: string]: unknown;
  }

  function slugify(input: string, options?: SlugifyOptions): string;

  export default slugify;
}
