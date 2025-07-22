package db

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"github.com/azainwork/posts/models"
	"fmt"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := "root:passwordBaru123@tcp(127.0.0.1:3306)/posts?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database: " + err.Error())
	}
	DB = db
}

func Migrate() {
	if DB == nil {
		fmt.Println("DB is not connected!")
		return
	}
	DB.AutoMigrate(&models.Post{})
} 