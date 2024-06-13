package com.example.BTC6_Nmap2

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


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

    @GetMapping("/api/toilet/{id}")
    fun getTodosID(@PathVariable("id") id: Long): Array<Toilet> {
        return toiletRepository.getToiletID(id)
    }

    @PostMapping("/api/toilet")
    fun saveToilet(@RequestBody toiletRequest: ToiletRequest): String {
        return toiletRepository.saveToilet(toiletRequest)
    }

    @DeleteMapping("/api/toilet/{id}")
    fun deleteTodo(@PathVariable("id") id: Long): Any {
        val res = toiletRepository.getToiletID(id)
        return if (res.isEmpty()) {
             ResponseEntity(HttpStatus.NOT_FOUND)
        } else {
             ResponseEntity.ok(toiletRepository.deleteToilet(id))
        }
    }
}