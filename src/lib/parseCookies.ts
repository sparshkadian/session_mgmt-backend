function parseCookies(cookieHeader: string | undefined) {
  if (!cookieHeader) return {};
  return cookieHeader.split(';').reduce((acc, curr) => {
    const [name, value] = curr.split('=').map((part) => part.trim());
    acc[name] = value;
    return acc;
  }, {} as Record<string, string>);
}

export default parseCookies;
