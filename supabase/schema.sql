-- ============================================================================
-- زرین پسته باقری — Schema برای پنل مدیریت محتوا
-- این فایل را یک‌بار کامل در Supabase Dashboard → SQL Editor اجرا کنید.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- جدول محصولات
-- ----------------------------------------------------------------------------
create table if not exists public.products (
  slug text primary key,
  title text not null,
  category text not null check (category in ('raw', 'kernel', 'khalal', 'powder')),
  short_description text not null,
  description text not null,
  main_image text,
  gallery text[] not null default '{}',
  specs jsonb not null default '{}',
  usages text[] not null default '{}',
  target_markets text[] not null default '{}',
  related_product_slugs text[] not null default '{}',
  related_article_slugs text[] not null default '{}',
  seo_title text not null,
  seo_description text not null,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- جدول مقالات دانشنامه
-- ----------------------------------------------------------------------------
create table if not exists public.articles (
  slug text primary key,
  title text not null,
  short_description text not null,
  content text[] not null default '{}',
  cover_image text,
  related_product_slugs text[] not null default '{}',
  seo_title text not null,
  seo_description text not null,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- جدول گواهی‌ها و مجوزها
-- ----------------------------------------------------------------------------
create table if not exists public.certificates (
  slug text primary key,
  title text not null,
  description text not null,
  image text,
  is_placeholder boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- جدول تصاویر محیط کارخانه
-- ----------------------------------------------------------------------------
create table if not exists public.factory_images (
  slug text primary key,
  caption text not null,
  image text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- جدول دستگاه‌ها
-- ----------------------------------------------------------------------------
create table if not exists public.machinery (
  slug text primary key,
  title text not null,
  description text not null,
  image text,
  capacity_label text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- جدول تنظیمات سایت (تک‌ردیفی)
-- ----------------------------------------------------------------------------
create table if not exists public.site_settings (
  id int primary key default 1,
  phone text,
  whatsapp_number text,
  whatsapp_enabled boolean not null default false,
  email text,
  address text,
  catalog_url text,
  updated_at timestamptz not null default now(),
  constraint site_settings_single_row check (id = 1)
);

-- ============================================================================
-- Row Level Security: خواندن عمومی برای همه، نوشتن فقط برای کاربر لاگین‌کرده
-- ============================================================================
alter table public.products enable row level security;
alter table public.articles enable row level security;
alter table public.certificates enable row level security;
alter table public.factory_images enable row level security;
alter table public.machinery enable row level security;
alter table public.site_settings enable row level security;

create policy "public read products" on public.products for select using (true);
create policy "public read articles" on public.articles for select using (true);
create policy "public read certificates" on public.certificates for select using (true);
create policy "public read factory_images" on public.factory_images for select using (true);
create policy "public read machinery" on public.machinery for select using (true);
create policy "public read site_settings" on public.site_settings for select using (true);

create policy "authenticated write products" on public.products for all to authenticated using (true) with check (true);
create policy "authenticated write articles" on public.articles for all to authenticated using (true) with check (true);
create policy "authenticated write certificates" on public.certificates for all to authenticated using (true) with check (true);
create policy "authenticated write factory_images" on public.factory_images for all to authenticated using (true) with check (true);
create policy "authenticated write machinery" on public.machinery for all to authenticated using (true) with check (true);
create policy "authenticated write site_settings" on public.site_settings for all to authenticated using (true) with check (true);

-- ============================================================================
-- Storage: باکت عمومی برای عکس‌ها و فایل PDF کاتالوگ
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects for select using (bucket_id = 'media');
create policy "authenticated insert media" on storage.objects for insert to authenticated with check (bucket_id = 'media');
create policy "authenticated update media" on storage.objects for update to authenticated using (bucket_id = 'media');
create policy "authenticated delete media" on storage.objects for delete to authenticated using (bucket_id = 'media');

-- ============================================================================
-- داده‌ی اولیه: محصولات (کپی از src/lib/data/products.ts فعلی)
-- ============================================================================
insert into public.products (slug, title, category, short_description, description, main_image, gallery, specs, usages, target_markets, related_product_slugs, related_article_slugs, seo_title, seo_description, featured, sort_order) values
('pesteh-akbari', 'پسته اکبری', 'raw',
 'یکی از بلندترین ارقام پسته ایران، با پوسته کشیده و ظاهر ممتاز.',
 'پسته اکبری یکی از شناخته‌شده‌ترین ارقام پسته ایران است که با پوسته کشیده و بلند خود از سایر ارقام متمایز می‌شود. این رقم در کاشمر تأمین، درجه‌بندی و بسته‌بندی می‌شود و برای مصرف خام یا بوداده مناسب است.',
 '/images/redesign/product-hero.webp',
 array['/images/redesign/product-thumb-1.webp','/images/redesign/product-thumb-2.webp','/images/redesign/product-thumb-3.webp','/images/redesign/product-thumb-4.webp','/images/redesign/product-thumb-5.webp'],
 '{"cultivar":"اکبری","opennessType":"خندان","storageConditions":"نگهداری در محل خشک و خنک، دور از رطوبت و نور مستقیم آفتاب","sizeOz":"در انتظار تکمیل اطلاعات","packagingType":"در انتظار تکمیل اطلاعات","minOrder":"در انتظار تکمیل اطلاعات"}'::jsonb,
 array['مصرف خام و بوداده','بسته‌بندی عمده و خرده‌فروشی'],
 array['عمده‌فروشان داخلی','مشتریان صادراتی'],
 array['pesteh-ahmad-aghaei','pesteh-kalleghouchi'],
 array['arqam-peste-iran'],
 'پسته اکبری | زرین پسته باقری',
 'تأمین و بسته‌بندی عمده پسته اکبری از کاشمر، خراسان رضوی. مناسب عمده‌فروشان، کارخانه‌ها و مشتریان صادراتی.',
 true, 1),

('pesteh-ahmad-aghaei', 'پسته احمدآقایی', 'raw',
 'رقمی کشیده و باکیفیت، مناسب بسته‌بندی صادراتی و هدیه.',
 'پسته احمدآقایی با شکل کشیده و ظاهر یک‌دست، یکی از ارقام مرغوب پسته ایران محسوب می‌شود. این محصول در زرین پسته باقری از تولیدکنندگان منطقه کاشمر تأمین و برای عرضه عمده و صادراتی آماده‌سازی می‌شود.',
 '/images/redesign/home-product-4.webp',
 array['/images/redesign/product-hero.webp'],
 '{"cultivar":"احمدآقایی","opennessType":"خندان","storageConditions":"نگهداری در محل خشک و خنک، دور از رطوبت و نور مستقیم آفتاب","sizeOz":"در انتظار تکمیل اطلاعات","packagingType":"در انتظار تکمیل اطلاعات","minOrder":"در انتظار تکمیل اطلاعات"}'::jsonb,
 array['مصرف خام و بوداده','بسته‌بندی هدیه و صادراتی'],
 array['عمده‌فروشان داخلی','مشتریان صادراتی'],
 array['pesteh-akbari','pesteh-fandoghi'],
 array['arqam-peste-iran'],
 'پسته احمدآقایی | زرین پسته باقری',
 'تأمین و بسته‌بندی عمده پسته احمدآقایی از کاشمر، خراسان رضوی. مناسب عمده‌فروشان، کارخانه‌ها و مشتریان صادراتی.',
 true, 2),

('pesteh-fandoghi', 'پسته فندقی', 'raw',
 'پرمصرف‌ترین رقم پسته ایران، با دانه‌ای گرد و متوسط.',
 'پسته فندقی به دلیل تولید بالا در باغات ایران، پرمصرف‌ترین و شناخته‌شده‌ترین رقم پسته کشور است. دانه‌ای گرد و متوسط دارد و برای مصارف عمده خانگی، صنعتی و صادراتی مناسب است.',
 '/images/redesign/home-product-3.webp',
 array['/images/redesign/related-3.webp'],
 '{"cultivar":"فندقی","opennessType":"خندان","storageConditions":"نگهداری در محل خشک و خنک، دور از رطوبت و نور مستقیم آفتاب","sizeOz":"در انتظار تکمیل اطلاعات","packagingType":"در انتظار تکمیل اطلاعات","minOrder":"در انتظار تکمیل اطلاعات"}'::jsonb,
 array['مصرف خام و بوداده','تأمین عمده صنعتی'],
 array['عمده‌فروشان داخلی','کارخانه‌های فرآوری','مشتریان صادراتی'],
 array['pesteh-akbari','pesteh-kalleghouchi'],
 array['arqam-peste-iran'],
 'پسته فندقی | زرین پسته باقری',
 'تأمین و بسته‌بندی عمده پسته فندقی از کاشمر، خراسان رضوی. مناسب عمده‌فروشان، کارخانه‌ها و مشتریان صادراتی.',
 true, 3),

('pesteh-kalleghouchi', 'پسته کله‌قوچی', 'raw',
 'درشت‌ترین رقم پسته ایران، با دانه‌ای بزرگ و گرد.',
 'پسته کله‌قوچی به دلیل اندازه بزرگ دانه، به‌عنوان درشت‌ترین رقم پسته ایران شناخته می‌شود. این محصول از باغات کاشمر تأمین می‌شود و برای بازارهایی که به دنبال اندازه دانه بزرگ‌تر هستند مناسب است.',
 '/images/redesign/related-2.webp',
 array['/images/redesign/product-thumb-2.webp'],
 '{"cultivar":"کله‌قوچی","opennessType":"خندان","storageConditions":"نگهداری در محل خشک و خنک، دور از رطوبت و نور مستقیم آفتاب","sizeOz":"در انتظار تکمیل اطلاعات","packagingType":"در انتظار تکمیل اطلاعات","minOrder":"در انتظار تکمیل اطلاعات"}'::jsonb,
 array['مصرف خام و بوداده','بسته‌بندی صادراتی'],
 array['مشتریان صادراتی','عمده‌فروشان داخلی'],
 array['pesteh-fandoghi','pesteh-akbari'],
 array['arqam-peste-iran'],
 'پسته کله‌قوچی | زرین پسته باقری',
 'تأمین و بسته‌بندی عمده پسته کله‌قوچی از کاشمر، خراسان رضوی. مناسب عمده‌فروشان، کارخانه‌ها و مشتریان صادراتی.',
 false, 4),

('maghz-pesteh-sabz', 'مغز پسته سبز', 'kernel',
 'مغز پسته پوست‌گرفته با رنگ سبز طبیعی، آماده مصرف صنعتی.',
 'مغز پسته سبز حاصل پوست‌گیری کامل پسته و جداسازی مغز با رنگ سبز طبیعی است. این محصول برای مصارف صنایع غذایی از جمله بستنی، شیرینی و شکلات مورد استفاده قرار می‌گیرد.',
 '/images/redesign/home-product-2.webp',
 array['/images/redesign/related-4.webp'],
 '{"kernelColor":"سبز روشن","kernelPercentage":"در انتظار تکمیل اطلاعات","storageConditions":"نگهداری در محل خشک و خنک، دور از رطوبت و نور مستقیم آفتاب","packagingType":"در انتظار تکمیل اطلاعات","minOrder":"در انتظار تکمیل اطلاعات"}'::jsonb,
 array['صنایع بستنی و شیرینی','صنایع شکلات‌سازی','بسته‌بندی خرده‌فروشی'],
 array['کارخانه‌های فرآوری مواد غذایی','مشتریان صادراتی'],
 array['maghz-pesteh-dopoost','khalal-pesteh'],
 array['tafavot-anva-maghz-pesteh'],
 'مغز پسته سبز | زرین پسته باقری',
 'تأمین عمده مغز پسته سبز از کاشمر، مناسب صنایع غذایی و مشتریان صادراتی.',
 true, 5),

('maghz-pesteh-dopoost', 'مغز پسته دوپوست', 'kernel',
 'مغز پسته با پوست نازک نگه‌داشته‌شده، مناسب مصارف صنعتی.',
 'مغز پسته دوپوست، مغزی است که پوست نازک دور آن حفظ شده است. این نوع مغز معمولاً در فرآیندهای صنعتی که نیاز به فرآوری بیشتر دارند مورد استفاده قرار می‌گیرد.',
 '/images/redesign/related-3.webp',
 array['/images/redesign/home-product-2.webp'],
 '{"kernelColor":"در انتظار تکمیل اطلاعات","kernelPercentage":"در انتظار تکمیل اطلاعات","storageConditions":"نگهداری در محل خشک و خنک، دور از رطوبت و نور مستقیم آفتاب","packagingType":"در انتظار تکمیل اطلاعات","minOrder":"در انتظار تکمیل اطلاعات"}'::jsonb,
 array['فرآوری صنعتی','صنایع غذایی'],
 array['کارخانه‌های فرآوری مواد غذایی','مشتریان صادراتی'],
 array['maghz-pesteh-sabz','pesteh-poudr'],
 array['tafavot-anva-maghz-pesteh'],
 'مغز پسته دوپوست | زرین پسته باقری',
 'تأمین عمده مغز پسته دوپوست از کاشمر، مناسب صنایع غذایی و مشتریان صادراتی.',
 false, 6),

('khalal-pesteh', 'خلال پسته', 'khalal',
 'پسته خلال‌شده، مناسب تزئین شیرینی، بستنی و شکلات.',
 'خلال پسته از برش نازک مغز پسته به‌دست می‌آید و عمدتاً برای تزئین شیرینی‌جات، بستنی و محصولات شکلاتی استفاده می‌شود. این محصول در اندازه‌های قابل تنظیم بر اساس نیاز مشتری بسته‌بندی می‌شود.',
 '/images/redesign/home-product-1.webp',
 array['/images/redesign/product-thumb-3.webp'],
 '{"kernelColor":"در انتظار تکمیل اطلاعات","storageConditions":"نگهداری در محل خشک و خنک، دور از رطوبت و نور مستقیم آفتاب","packagingType":"در انتظار تکمیل اطلاعات","minOrder":"در انتظار تکمیل اطلاعات"}'::jsonb,
 array['تزئین شیرینی و بستنی','صنایع شکلات‌سازی'],
 array['کارخانه‌های شیرینی و شکلات','مشتریان صادراتی'],
 array['maghz-pesteh-sabz','pesteh-poudr'],
 array['tafavot-anva-maghz-pesteh'],
 'خلال پسته | زرین پسته باقری',
 'تأمین عمده خلال پسته از کاشمر، مناسب صنایع شیرینی، بستنی و شکلات.',
 true, 7),

('pesteh-poudr', 'پودر پسته', 'powder',
 'پودر حاصل از آسیاب مغز پسته، برای مصارف صنایع غذایی.',
 'پودر پسته از آسیاب مغز پسته تهیه می‌شود و در صنایع غذایی از جمله شیرینی‌پزی، بستنی‌سازی و تولید محصولات ترکیبی کاربرد دارد. دانه‌بندی پودر بر اساس نیاز مشتری قابل تنظیم است.',
 '/images/redesign/related-4.webp',
 array['/images/redesign/home-product-1.webp'],
 '{"storageConditions":"نگهداری در محل خشک و خنک، دور از رطوبت و نور مستقیم آفتاب","packagingType":"در انتظار تکمیل اطلاعات","minOrder":"در انتظار تکمیل اطلاعات"}'::jsonb,
 array['شیرینی‌پزی و قنادی','صنایع بستنی'],
 array['کارخانه‌های فرآوری مواد غذایی','مشتریان صادراتی'],
 array['khalal-pesteh','maghz-pesteh-dopoost'],
 array['tafavot-anva-maghz-pesteh'],
 'پودر پسته | زرین پسته باقری',
 'تأمین عمده پودر پسته از کاشمر، مناسب صنایع غذایی و مشتریان صادراتی.',
 false, 8)
on conflict (slug) do nothing;

-- ============================================================================
-- داده‌ی اولیه: مقالات دانشنامه
-- ============================================================================
insert into public.articles (slug, title, short_description, content, cover_image, related_product_slugs, seo_title, seo_description, featured, sort_order) values
('arqam-peste-iran', 'آشنایی با ارقام اصلی پسته ایران',
 'معرفی کوتاه رقم‌های اکبری، احمدآقایی، فندقی و کله‌قوچی و تفاوت ظاهری آن‌ها.',
 array[
   'پسته ایران در رقم‌های مختلفی کشت می‌شود که هر یک ویژگی‌های ظاهری و کاربردی خاص خود را دارند. شناخت این رقم‌ها برای خریداران عمده و صادراتی در انتخاب محصول مناسب اهمیت دارد.',
   'پسته اکبری با پوسته کشیده و بلند شناخته می‌شود و از نظر ظاهری یکی از ممتازترین رقم‌ها به شمار می‌رود. پسته احمدآقایی نیز شکلی کشیده دارد و معمولاً برای بسته‌بندی هدیه و صادراتی مورد توجه است.',
   'پسته فندقی به دلیل حجم بالای تولید، پرمصرف‌ترین رقم پسته کشور محسوب می‌شود و دانه‌ای گرد و متوسط دارد. در مقابل، پسته کله‌قوچی با دانه‌ای درشت و گرد، درشت‌ترین رقم پسته ایران است.',
   'انتخاب رقم مناسب معمولاً بر اساس بازار هدف، نوع مصرف (خام، بوداده یا صنعتی) و ترجیح ظاهری خریدار تعیین می‌شود.'
 ],
 '/images/redesign/article-1.webp',
 array['pesteh-akbari','pesteh-ahmad-aghaei','pesteh-fandoghi','pesteh-kalleghouchi'],
 'آشنایی با ارقام اصلی پسته ایران | دانشنامه زرین پسته باقری',
 'معرفی رقم‌های اکبری، احمدآقایی، فندقی و کله‌قوچی و تفاوت‌های ظاهری آن‌ها برای خریداران عمده و صادراتی.',
 true, 1),

('tafavot-anva-maghz-pesteh', 'تفاوت انواع مغز پسته در کاربردهای صنعتی',
 'بررسی تفاوت مغز پسته سبز، مغز دوپوست، خلال و پودر پسته برای مصارف صنایع غذایی.',
 array[
   'مغز پسته بسته به میزان فرآوری، در چند شکل مختلف در صنایع غذایی مورد استفاده قرار می‌گیرد. هر شکل، کاربرد و ویژگی‌های خاص خود را دارد.',
   'مغز پسته سبز از پوست‌گیری کامل پسته به‌دست می‌آید و به دلیل رنگ طبیعی سبز، بیشتر در صنایع بستنی و شیرینی مورد استفاده قرار می‌گیرد. مغز پسته دوپوست، پوست نازک دور خود را حفظ کرده و معمولاً در مراحل بعدی فرآوری می‌شود.',
   'خلال پسته از برش نازک مغز به‌دست می‌آید و عمدتاً برای تزئین شیرینی، بستنی و شکلات استفاده می‌شود. پودر پسته نیز از آسیاب مغز پسته تهیه می‌شود و در فرمولاسیون محصولات غذایی ترکیبی کاربرد دارد.',
   'انتخاب نوع مناسب مغز پسته به فرآیند تولید و محصول نهایی کارخانه بستگی دارد.'
 ],
 '/images/redesign/article-2.webp',
 array['maghz-pesteh-sabz','maghz-pesteh-dopoost','khalal-pesteh','pesteh-poudr'],
 'تفاوت انواع مغز پسته در کاربردهای صنعتی | دانشنامه زرین پسته باقری',
 'بررسی تفاوت مغز پسته سبز، مغز دوپوست، خلال و پودر پسته و کاربرد هر یک در صنایع غذایی.',
 true, 2),

('negahdari-peste-kham', 'نکات نگهداری پسته خام و بوداده',
 'راهنمای کلی نگهداری پسته برای حفظ کیفیت در انبار و طول مسیر حمل.',
 array[
   'نگهداری صحیح پسته، چه در مرحله انبارداری و چه در طول مسیر حمل، نقش مهمی در حفظ کیفیت محصول دارد.',
   'به‌طور کلی، پسته باید در محلی خشک و خنک، دور از رطوبت و نور مستقیم آفتاب نگهداری شود. نوسان دما و رطوبت بالا می‌تواند بر کیفیت ظاهری و ماندگاری محصول اثر بگذارد.',
   'برای حمل‌ونقل حجم عمده، انتخاب بسته‌بندی مناسب متناسب با فاصله و شرایط اقلیمی مسیر توصیه می‌شود.'
 ],
 '/images/redesign/article-3.webp',
 array['pesteh-fandoghi','pesteh-akbari'],
 'نکات نگهداری پسته خام و بوداده | دانشنامه زرین پسته باقری',
 'راهنمای کلی نگهداری پسته خام و بوداده برای حفظ کیفیت در انبار و طول مسیر حمل.',
 false, 3)
on conflict (slug) do nothing;

-- ============================================================================
-- داده‌ی اولیه: گواهی‌ها
-- ============================================================================
insert into public.certificates (slug, title, description, image, is_placeholder, sort_order) values
('iso-22000', 'ISO 22000', 'مدیریت ایمنی مواد غذایی', '/images/redesign/cert-1.webp', true, 1),
('haccp', 'HACCP', 'کنترل نقاط بحرانی', '/images/redesign/cert-2.webp', true, 2),
('iso-9001', 'ISO 9001', 'مدیریت کیفیت', '/images/redesign/cert-3.webp', true, 3),
('iso-14001', 'ISO 14001', 'مدیریت زیست‌محیطی', '/images/redesign/cert-4.webp', true, 4),
('iran-code', 'ایران کد', 'کد شناسایی کالا', '/images/redesign/cert-5.webp', true, 5),
('health-license', 'سازمان غذا و دارو', 'مجوز بهداشتی', '/images/redesign/cert-6.webp', true, 6),
('national-standard', 'استاندارد ملی ایران', 'نشان استاندارد', '/images/redesign/cert-7.webp', true, 7),
('operation-license', 'پروانه بهره‌برداری', 'وزارت صنعت، معدن و تجارت', '/images/redesign/cert-8.webp', true, 8),
('chamber', 'عضویت اتاق بازرگانی', 'صنایع، معادن و کشاورزی', '/images/redesign/cert-9.webp', true, 9)
on conflict (slug) do nothing;

-- ============================================================================
-- داده‌ی اولیه: تصاویر کارخانه
-- ============================================================================
insert into public.factory_images (slug, caption, image, sort_order) values
('factory-1', 'نمای بیرونی کارخانه', '/images/redesign/factory-gallery-1.webp', 1),
('factory-2', 'خط فرآوری و بو دادن', '/images/redesign/factory-gallery-2.webp', 2),
('factory-3', 'خط سورتینگ و درجه‌بندی', '/images/redesign/factory-gallery-3.webp', 3),
('factory-4', 'خط بسته‌بندی اتوماتیک', '/images/redesign/factory-gallery-4.webp', 4),
('factory-5', 'انبار محصول نهایی', '/images/redesign/factory-gallery-5.webp', 5),
('factory-6', 'تیم کنترل کیفیت', '/images/redesign/factory-gallery-6.webp', 6)
on conflict (slug) do nothing;

-- ============================================================================
-- داده‌ی اولیه: دستگاه‌ها
-- ============================================================================
insert into public.machinery (slug, title, description, image, capacity_label, sort_order) values
('continuous-roaster', 'دستگاه بو دادن پیوسته', 'فرآوری یکنواخت محصول با کنترل دقیق دما و زمان.', '/images/redesign/machine-1.webp', null, 1),
('laser-sorter', 'دستگاه سورتینگ لیزری', 'جداسازی محصول بر اساس رنگ و کیفیت ظاهری.', '/images/redesign/machine-2.webp', null, 2),
('washer-dryer', 'دستگاه شستشو و خشک‌کن', 'شستشو و خشک‌کردن کنترل‌شده در خط فرآوری.', '/images/redesign/machine-3.webp', null, 3),
('automatic-packer', 'دستگاه بسته‌بندی اتوماتیک', 'بسته‌بندی سریع و استاندارد برای سفارش‌های عمده.', '/images/redesign/machine-4.webp', null, 4),
('multihead-scale', 'دستگاه ترازوی چندسر', 'توزین دقیق و یکنواخت پیش از بسته‌بندی.', '/images/redesign/machine-5.webp', null, 5),
('filler-sealer', 'دستگاه پرکن و سلفون', 'تکمیل بسته‌بندی و محافظت از محصول نهایی.', '/images/redesign/machine-6.webp', null, 6)
on conflict (slug) do nothing;

-- ============================================================================
-- داده‌ی اولیه: تنظیمات سایت (مطابق مقادیر فعلی src/lib/config/*.ts)
-- ============================================================================
insert into public.site_settings (id, phone, whatsapp_number, whatsapp_enabled, email, address, catalog_url) values
(1, null, null, false, null, 'کاشمر، خراسان رضوی — در انتظار تکمیل اطلاعات نشانی دقیق', '/catalog/zarin-pesteh-bagheri-catalog.pdf')
on conflict (id) do nothing;
