package com.example.BTC6_Nmap2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController


@RestController
class NmapController (@Autowired val toiletRepository: ToiletRepository) {

    @GetMapping("/api/toilet")
    fun getLists():ResponseEntity<Array<Toilet>>{
        val res = toiletRepository.getToilettes()
        return if (res.isEmpty()){
            ResponseEntity(HttpStatus.NOT_FOUND)
        }else{
            ResponseEntity.ok(toiletRepository.getToilettes())
        }
    }

    @PostMapping("/api/toilet")
    fun saveToilet(@RequestBody toiletRequest: ToiletRequest): String {
        println("ポストルート通過")
        return toiletRepository.saveToilet(toiletRequest)
    }
}