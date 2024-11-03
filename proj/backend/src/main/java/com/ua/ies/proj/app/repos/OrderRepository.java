package com.ua.ies.proj.app.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ua.ies.proj.app.models.Order;
import com.ua.ies.proj.app.models.OrderStatisticsDTO;

public interface OrderRepository extends JpaRepository<Order, Long>{
    List<Order> findByRestaurantIdAndStatus(Long restaurant_id, String status);
    List<Order> findByRestaurantId(Long restaurant_id);

    @Query(value = "SELECT m.id as menuId, " +
                   "time_bucket('1 minute', o.created_at) AS bucket, " +
                   "COUNT(o.id) as totalOrders " +
                   "FROM orders o " +
                   "JOIN order_items oi ON o.id = oi.order_id " +
                   "JOIN menu m ON oi.menu_id = m.id " +
                   "WHERE o.created_at >= NOW() - INTERVAL '10 minutes' " +
                   "AND m.foodchain_id = :foodchainId " +
                   "GROUP BY m.id, bucket " +
                   "ORDER BY totalOrders DESC " +
                   "LIMIT 5", nativeQuery = true)
    List<OrderStatisticsDTO> findTop5MenusTrendForLast10MinutesByChainId(
            @Param("foodchainId") Long foodchainId);

    @Query(value = "SELECT m.id as menuId, " +
            "time_bucket('1 minute', o.created_at) AS bucket, " +
            "COUNT(o.id) as totalOrders " +
            "FROM orders o " +
            "JOIN order_items oi ON o.id = oi.order_id " +
            "JOIN menu m ON oi.menu_id = m.id " +
            "WHERE o.created_at >= NOW() - INTERVAL '10 minutes' " +
            "AND m.foodchain_id = :foodchainId " +
            "AND o.restaurant_id = :restaurantId " +
            "GROUP BY m.id, bucket " +
            "ORDER BY totalOrders DESC " +
            "LIMIT 5", nativeQuery = true)
    List<OrderStatisticsDTO> findTop5MenusTrendForLast10MinutesByRestaurantId(
            @Param("restaurantId") Long restaurantId);
}
