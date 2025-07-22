package main

import (
	"github.com/azainwork/posts/db"
	"github.com/gin-gonic/gin"
	"github.com/azainwork/posts/routes"
	"github.com/gin-contrib/cors"
)

func main() {
	db.ConnectDB()
	db.Migrate()

	r := gin.Default()
	r.Use(cors.Default())

	routes.ArticleRoutes(r)
	r.Run(":8087")
}