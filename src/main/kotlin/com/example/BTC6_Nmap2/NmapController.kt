package com.example.BTC6_Nmap2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.sql.ResultSet

class ToiletRowMapper : RowMapper<Toilet> {
    override fun mapRow(rs: ResultSet, rowNum: Int): Toilet {
        return Toilet(
            rs.getLong(1),
            rs.getString(2),
            rs.getString(3),
            rs.getBigDecimal(4),
            rs.getBigDecimal(5),
            rs.getShort(6),
            rs.getShort(7),
            rs.getShort(8),
            rs.getShort(9),
            rs.getBoolean(10),
            rs.getBoolean(11),
            rs.getBoolean(12),
            )
    }
}

@RestController
class NmapController (@Autowired val jdbcTemplate: JdbcTemplate) {

    @GetMapping("/api/lists")
    fun getLists():Array<Toilet>{
        val toiletRowMapper = ToiletRowMapper()
        val toilet = jdbcTemplate.query("SELECT id,name,address,latitude,longitude,m_sum,w_sum,uni_sum," +
                "multi_toilet,wheelchair,babies,ostomate FROM toilettes",toiletRowMapper)
        return toilet.toTypedArray()
    }
}