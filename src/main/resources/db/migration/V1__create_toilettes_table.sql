CREATE TABLE toilettes (
    id SERIAL PRIMARY KEY,
    name TEXT,
    address TEXT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    m_sum INTEGER,
    w_sum INTEGER,
    uni_sum INTEGER,
    multi_toilet INTEGER,
    wheelchair BOOLEAN,
    babies BOOLEAN,
    ostomate BOOLEAN
)