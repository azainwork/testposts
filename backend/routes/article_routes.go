package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/azainwork/posts/controllers"
)

func ArticleRoutes(r *gin.Engine) {
	r.POST("/article/", controllers.CreateArticle)
	r.GET("/article", controllers.GetArticles)
	r.GET("/article/:id", controllers.GetArticleById)
	r.PUT("/article/:id", controllers.UpdateArticle)
	r.PATCH("/article/:id", controllers.UpdateArticle)
	r.DELETE("/article/:id", controllers.DeleteArticle)
} 