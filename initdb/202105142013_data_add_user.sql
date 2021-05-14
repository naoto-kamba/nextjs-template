INSERT INTO TBM_USER (
    USER_ID,
    EMAIL,
    PASSWORD,
    DELETE_FLAG
) VALUES (
    'admin',
    'admin@dummy.com',
    encode(digest('Padmin', 'sha256'),'hex'),
    '0'
);
