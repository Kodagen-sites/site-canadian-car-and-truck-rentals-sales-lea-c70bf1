-- Seed sites row + inventory rows for Canadian Car and Truck.
-- Run AFTER admin-schema.sql is applied.

insert into public.sites (slug, name, brand, published_config)
values (
  'canadian-car-and-truck-rentals-sales-lea-c70bf1',
  'Canadian Car and Truck Rentals, Sales & Leasing',
  jsonb_build_object(
    'wordmark', 'CC&T',
    'tagline', 'Rent smart. Rent Canadian.',
    'accent_color', '#ffaa40',
    'palette_name', 'graphite-amber'
  ),
  jsonb_build_object(
    'voice_family', 'V6',
    'archetype', 'G',
    'style', 'S5',
    'managed_via', 'sitegenerator-pipeline'
  )
)
on conflict (slug) do update
  set brand = excluded.brand,
      published_config = excluded.published_config,
      updated_at = now();

insert into public.inventory (slug, year, make, model, category, mileage_km, mileage_mi, price_cad)
values
  ('2025-chevrolet-silverado-3500', 2025, 'Chevrolet', 'Silverado 3500', 'Truck', 19900, null, 68900),
  ('2024-ram-promaster', 2024, 'RAM', 'ProMaster', 'Cargo Van', 30500, null, 53900),
  ('2024-ford-transit-cargo-van', 2024, 'Ford', 'Transit Cargo Van', 'Cargo Van', 20950, null, 49990),
  ('2023-ford-f-150', 2023, 'Ford', 'F-150', 'Truck', 43900, null, 47500),
  ('2023-chevrolet-traverse', 2023, 'Chevrolet', 'Traverse', 'SUV', 31200, null, 35500),
  ('2023-chevrolet-express-cutaway', 2023, 'Chevrolet', 'Express Commercial Cutaway', 'Commercial', 51000, null, 69990),
  ('2022-ford-f-350', 2022, 'Ford', 'Super Duty F-350 SRW', 'Truck', 102400, null, 79990),
  ('1971-gmc-suburban', 1971, 'GMC', 'Suburban', 'Collector', null, 75600, 49999)
on conflict (slug) do update
  set year = excluded.year,
      make = excluded.make,
      model = excluded.model,
      category = excluded.category,
      mileage_km = excluded.mileage_km,
      mileage_mi = excluded.mileage_mi,
      price_cad = excluded.price_cad,
      updated_at = now();
