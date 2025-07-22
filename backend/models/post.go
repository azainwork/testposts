package models

import (
	"time"
)

type PostStatus string

const (
    StatusPublish PostStatus = "publish"
    StatusDraft   PostStatus = "draft"
    StatusThrash  PostStatus = "thrash"
)

type Post struct {
	Id          int       `gorm:"primaryKey;autoIncrement" json:"id"`
	Title       string    `gorm:"type:varchar(200);not null" json:"title"`
	Content     string    `gorm:"type:text;not null" json:"content"`
	Category    string    `gorm:"type:varchar(100);not null" json:"category"`
	CreatedDate time.Time `gorm:"type:datetime;default:CURRENT_TIMESTAMP" json:"created_date"`
	UpdatedDate time.Time `gorm:"type:datetime;default:CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" json:"updated_date"`
	Status PostStatus `gorm:"type:enum('publish','draft','thrash');not null" json:"status"`
} 