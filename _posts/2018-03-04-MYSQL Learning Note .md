

> After you install mySQL database, there are some procedures you have to set up before we start to use it, for this passage we are going to tell a few procedures for everyone who uses MySQL database

- Initial Setting up after you install mysql
    - Login in mySQL database ```mysql -u root```, **root** is the default user in mySQL database.
    - After connect into database, you can start to create a new account
- After download mysql, there are some setting before you use it 
    - Create a new username and password as well as configure the privilege
        - ```Create user username identified by password``` and ``` Grant all privileges on *.* to user@localhost ``` 
    - type the command ```mysql --user username --password password``` and ```mysql -u username -p password``` to login in the database system
    - After login mysql, you can start to execute mysql function
    - The command, ```Show databases;```, helps you know all the database in the mysql.
    - The command, ```Use Your_database_Name```,lets you access the database.
    - If you want to show the tables in your database, you can use ```Show tables ```, and the system will list the tables on the command line.
- Create Table
    - ``` Create Table tablename (column name1, attribute, column name2 attribute, column name3 attribute)```
- Change the attribute from column
    - ``` Alter tablename add column_name datatype```
    - ``` Alter tablename drop column_name```
    - ``` Alter tablename modify column column_name1 datatype1 after column_name2``` 
- CRUD
    - Insert a new data
        - ```Insert into table(attribute1,attribute2,attribute3) Values(value1,value2,value3)```
    - Read the data from table
        - ```Select * from table```
    - Update the data
        - ```Update tablename set column1=new_value1,column2=new_value2 where condition=[id]```
    - Delete the data
        - ```Delete from table name where attribute=[id]```
- Clear all the data in DB
    - ```Truncate table tablename```
    
