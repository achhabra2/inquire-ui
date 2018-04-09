let base;

if (process.env.NODE_ENV !== 'production') {
  base = 'http://localhost:3000';
} else {
  base = '';
}

const config = {
  base,
};

export default config;
