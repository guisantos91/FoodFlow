package com.ua.ies.proj.app.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ua.ies.proj.app.models.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{
        List<Order> findByRestaurantIdAndStatus(Long restaurant_id, String status);
        List<Order> findByRestaurantId(Long restaurant_id);

        @Query(value = """
            SELECT m.name AS menuName, m.id AS menuId, m.price AS menuPrice,
                   time_bucket('1 minute', o.created_at) AS bucket,
                   COUNT(o.id) AS orderCount
            FROM order_items oi
            JOIN orders o ON oi.order_id = o.id
            JOIN menu m ON oi.menu_id = m.id
            WHERE o.created_at >= NOW() - INTERVAL '5 minutes'
            GROUP BY m.name,m.id, m.price, bucket
            ORDER BY m.name,m.id, m.price, bucket;
            """, nativeQuery = true)
        List<Object[]> getAllStatistics();

        @Query(value = """
            SELECT m.name AS menuName, m.id AS menuId, m.price AS menuPrice,
                   time_bucket('1 minute', o.created_at) AS bucket,
                   COUNT(o.id) AS orderCount
            FROM order_items oi
            JOIN orders o ON oi.order_id = o.id
            JOIN menu m ON oi.menu_id = m.id
            WHERE o.created_at >= NOW() - INTERVAL '5 minutes'
            AND m.foodchain_id = :foodchainId
            GROUP BY m.name, m.id, m.price, bucket
            ORDER BY m.name, m.id, m.price, bucket
            """, nativeQuery = true)
        List<Object[]> getStatisticsByChainId(@Param("foodchainId") Long foodchainId);

        @Query(value = """
            SELECT m.name AS menuName, m.id AS menuId, m.price AS menuPrice, 
                   time_bucket('1 minute', o.created_at) AS bucket,
                   COUNT(o.id) AS orderCount
            FROM order_items oi
            JOIN orders o ON oi.order_id = o.id
            JOIN menu m ON oi.menu_id = m.id
            WHERE o.created_at >= NOW() - INTERVAL '5 minutes'
            AND o.restaurant_id = :restaurantId
            GROUP BY m.name, m.id, m.price, bucket
            ORDER BY m.name, m.id, m.price, bucket
            """, nativeQuery = true)
        List<Object[]> getStatisticsByRestaurantId(
                        @Param("restaurantId") Long restaurantId);
}