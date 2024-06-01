#!/bin/bash

# Database credentials
DB_USER="postgres"
DB_HOST="localhost"
DB_PORT="5432"

# Database name
DB_NAME="counter"

# Create the database
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d postgres -c "CREATE DATABASE $DB_NAME;"

# Check if the database was created successfully
if [ $? -eq 0 ]; then
	echo "Database '$DB_NAME' created successfully."
else
	echo "Failed to create database '$DB_NAME'."
fi
