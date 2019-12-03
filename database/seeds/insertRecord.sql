--EXEC sp_changedbowner 'sa'

--Add records
--Test data: Customer
select * from Customer

INSERT INTO Customer VALUES ('Ely Buendia', 'San Fernando, La Union')
INSERT INTO Customer VALUES ('Buddy Zabala', 'Quezon City')
INSERT INTO Customer VALUES ('Marcus Adoro', 'La Union')
INSERT INTO Customer VALUES ('Raymond Marasigan', 'Marikina, Metro Manila')
INSERT INTO Customer VALUES ('Chito Miranda	', 'Alfonso, Cavite')
INSERT INTO Customer VALUES ('Vinci Montaner', 'Quezon City, Metro Manila')
INSERT INTO Customer VALUES ('Buwi Meneses', 'San Juan, Batangas')
INSERT INTO Customer VALUES ('Dar Semaña', 'Manila')
INSERT INTO Customer VALUES ('Gab Chee Kee', 'Quezon City')
INSERT INTO Customer VALUES ('Dindin Moren', 'Manila')
INSERT INTO Customer VALUES ('Francis Magalona', 'Antipolo, Rizal')

--Test data: Product
select * from Product

INSERT INTO Product VALUES ('Guitar', 400.00 )
INSERT INTO Product VALUES ('Drum set', 500.00 )
INSERT INTO Product VALUES ('Drum stick', 20.50 )
INSERT INTO Product VALUES ('Keyboard', 300.00 )
INSERT INTO Product VALUES ('Amplifier', 250.00 )
INSERT INTO Product VALUES ('Guitar string', 3.50 )
INSERT INTO Product VALUES ('Microphone', 30.00 )
INSERT INTO Product VALUES ('Beat box', 180.00 )
INSERT INTO Product VALUES ('Tambourine', 35.00 )
INSERT INTO Product VALUES ('Triangle', 40.00 )
INSERT INTO Product VALUES ('Synthesiser', 225.00 )

--Test data: Store
select * from Store

INSERT INTO Store VALUES ('JB Music', 'Pasig City, Metro Manila' )
INSERT INTO Store VALUES ('Perfect Pitch', 'Makati City' )
INSERT INTO Store VALUES ('Audio Pile Components', 'Manila' )
INSERT INTO Store VALUES ('Lazer Music', 'Manila' )
INSERT INTO Store VALUES ('Cresendo Audio and Music Store', 'Quezon City' )
INSERT INTO Store VALUES ('DJM Music Center', 'Laguna' )
INSERT INTO Store VALUES ('The Music Source', 'Quezon City' )
INSERT INTO Store VALUES ('Global Music', 'Manila' )
INSERT INTO Store VALUES ('Yupangco Music', 'Makati City' )
INSERT INTO Store VALUES ('RJ Guitar Center', 'Mandaluyong City' )
INSERT INTO Store VALUES ('Yamaha', 'Mandaluyong City' )

--Test Data: Sales
select * from Sales

INSERT INTO Sales VALUES ('2019-11-10', 1, 1, 1 )
INSERT INTO Sales VALUES ('2019-11-10', 2, 2, 1 )
INSERT INTO Sales VALUES ('2019-11-10', 3, 3, 2 )
INSERT INTO Sales VALUES ('2019-11-10', 4, 4, 2 )
INSERT INTO Sales VALUES ('2019-11-10', 5, 5, 3 )
INSERT INTO Sales VALUES ('2019-11-10', 6, 6, 3 )
INSERT INTO Sales VALUES ('2019-11-10', 7, 7, 4 )
INSERT INTO Sales VALUES ('2019-11-10', 8, 8, 4 )
INSERT INTO Sales VALUES (GETDATE(), 9, 9, 5 )
INSERT INTO Sales VALUES (GETDATE(), 10, 10, 5 )