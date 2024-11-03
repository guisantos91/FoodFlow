package com.ua.ies.proj.app.models;

import java.time.Instant;

public class OrderStatisticsDTO {
    private Long menuId;
    private Instant bucket;
    private Integer totalOrders;

    public OrderStatisticsDTO(Long menuId, Instant bucket, Integer totalOrders) {
        this.menuId = menuId;
        this.bucket = bucket;
        this.totalOrders = totalOrders;
    }

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
        this.menuId = menuId;
    }

    public Instant getBucket() {
        return bucket;
    }

    public void setBucket(Instant bucket) {
        this.bucket = bucket;
    }

    public Integer getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(Integer totalOrders) {
        this.totalOrders = totalOrders;
    }
}