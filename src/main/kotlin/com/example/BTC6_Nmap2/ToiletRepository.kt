package com.example.BTC6_Nmap2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Component
import org.springframework.stereotype.Repository
import java.sql.ResultSet

@Component
class ToiletRowMapper : RowMapper<Toilet> {
    override fun mapRow(rs: ResultSet, rowNum: Int): Toilet {
        return Toilet(
            rs.getLong(1),
            rs.getString(2),
            rs.getString(3),
            rs.getDouble(4),
            rs.getDouble(5),
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

@Repository
class ToiletRepository(
    @Autowired val jdbcTemplate: JdbcTemplate,
    @Autowired val toiletRowMapper: ToiletRowMapper,
) {

    fun getToilettes():Array<Toilet>{
        val toilet = jdbcTemplate.query("SELECT id,name,address,latitude,longitude,m_sum,w_sum,uni_sum," +
                "multi_toilet,wheelchair,babies,ostomate FROM toilettes",toiletRowMapper)
        return toilet.toTypedArray()
    }

    fun saveToilet(todoRequest: ToiletRequest): String {
        val name = todoRequest.name
        val address = todoRequest.address
        val latitude = todoRequest.latitude
        val longitude = todoRequest.longitude
        val m_sum = todoRequest.m_sum
        val w_sum = todoRequest.w_sum
        val uni_sum = todoRequest.uni_sum
        val multi_toilet = todoRequest.multi_toilet
        val wheelchair = todoRequest.wheelchair
        val babies = todoRequest.babies
        val ostomate = todoRequest.ostomate

        jdbcTemplate.update("INSERT INTO toilettes " +
                "(name,address,latitude,longitude,m_sum,w_sum,uni_sum,multi_toilet," +
                "wheelchair,babies,ostomate) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            name,address,latitude,longitude,m_sum,w_sum,uni_sum,multi_toilet,wheelchair,babies,ostomate)
        return "update"
    }
}