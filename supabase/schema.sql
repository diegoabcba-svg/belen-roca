create table categories (id bigint generated always as identity primary key, name text not null, slug text unique not null, description text, image_url text, active boolean default true, created_at timestamptz default now());
create table products (id bigint generated always as identity primary key, name text not null, slug text unique not null, description text, short_description text, price numeric(12,2) not null, compare_price numeric(12,2), category_id bigint references categories(id) on delete set null, stock int default 0, featured boolean default false, active boolean default true, material text, size text, created_at timestamptz default now(), updated_at timestamptz default now());
create table product_images (id bigint generated always as identity primary key, product_id bigint not null references products(id) on delete cascade, image_url text not null, sort_order int default 0);
create table orders (id bigint generated always as identity primary key, customer_name text, customer_phone text, customer_email text, total numeric(12,2), status text default 'pending', created_at timestamptz default now());
create table order_items (id bigint generated always as identity primary key, order_id bigint not null references orders(id) on delete cascade, product_id bigint references products(id) on delete set null, product_name text, quantity int not null, price numeric(12,2), subtotal numeric(12,2));
create index on products(category_id); create index on product_images(product_id);
-- RLS: lectura pública solo de lo activo. orders/order_items quedan cerrados (sin políticas) hasta la etapa 2.
alter table categories enable row level security; alter table products enable row level security; alter table product_images enable row level security; alter table orders enable row level security; alter table order_items enable row level security;
create policy "public read categories" on categories for select using (active);
create policy "public read products" on products for select using (active);
create policy "public read images" on product_images for select using (true);
-- Datos de ejemplo
insert into categories (name, slug) values ('Anillos','anillos'),('Aros','aros'),('Cadenas','cadenas'),('Pulseras','pulseras'),('Dijes','dijes'),('Conjuntos','conjuntos');
insert into products (name, slug, description, price, compare_price, category_id, stock, featured, material, size) values
('Aro Corazón','aro-corazon','Aro con forma de corazón.',18000,24000,(select id from categories where slug='aros'),10,true,'Acero','2 cm'),
('Anillo Clásico','anillo-clasico','Anillo liso.',15000,null,(select id from categories where slug='anillos'),8,true,'Acero','Ajustable'),
('Cadena Fina','cadena-fina','Cadena delicada.',22000,null,(select id from categories where slug='cadenas'),6,true,'Acero','45 cm'),
('Pulsera Eslabones','pulsera-eslabones','Pulsera de eslabones.',20000,26000,(select id from categories where slug='pulseras'),4,true,'Acero','18 cm'),
('Dije Estrella','dije-estrella','Dije de estrella.',12000,null,(select id from categories where slug='dijes'),12,false,'Acero','1.5 cm'),
('Conjunto Noche','conjunto-noche','Collar y aros.',38000,45000,(select id from categories where slug='conjuntos'),3,true,'Acero','-');
-- Imágenes: insert into product_images (product_id, image_url, sort_order) values (1,'https://.../foto.jpg',0);
