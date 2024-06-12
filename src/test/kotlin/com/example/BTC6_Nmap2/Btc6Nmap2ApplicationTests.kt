package com.example.BTC6_Nmap2

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.hamcrest.Matchers.hasItem
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus
import org.springframework.test.context.jdbc.Sql
import kotlin.reflect.jvm.internal.impl.load.kotlin.JvmType

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Sql("/insert_test_data.sql")
class Btc6Nmap2ApplicationTests (
	@Autowired val restTemplate: TestRestTemplate,
	@LocalServerPort val port: Int,
){

	@Test
	fun contextLoads() {
	}

	@Test
	fun `最初のテスト`() {
		assertThat(1+2, equalTo(3))
	}

	@Test
	fun `GETリクエストはOKステータスを返す`(){
		//Localhost/api/lists　にGETリクエストを発行する
		val response = restTemplate.getForEntity("http://localhost:$port/api/toilet",String::class.java)
		// レスポンスのステータスコードはOKである
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}

	@Test
	fun `GETリクエストはtoilettesオブジェクトのリストを返す`(){
		//リクエスト実行
		val response = restTemplate.getForEntity("http://localhost:$port/api/toilet",Array<Toilet>::class.java)
		val toilettes = response.body!!
		//取得した配列の長さが2である
		assertThat(toilettes.size, equalTo(3))
		//最初の要素の name は "田園バレー交流施設" であること
		assertThat(toilettes[0].name, equalTo("あぐりん村"))
		//2番目の要素の name は "立石池" であること
		assertThat(toilettes[1].name, equalTo("立石池"))
	}

	@Test
	fun `POSTリクエストはOKステータスを返す`(){
		// localhost/api/listsに POSTリクエストを送る。この時のボディは{
		val request = ToiletRequest("テスト公園","テスト市",99.999999,135.555555,9,9,9,9,true,true,true )
		val response = restTemplate.postForEntity("http://localhost:$port/api/toilet",request,String::class.java)
		// レスポンスのステータスコードは OK であること。
		assertThat(response.statusCode, equalTo(HttpStatus.OK))
	}

	@Test
	fun `POSTリクエストはToiletオブジェクトを格納する`() {
		// localhost/toilet に GETリクエストを送り、レスポンスを Toiletオブジェクトの配列として解釈する。
		val response = restTemplate.getForEntity("http://localhost:$port/api/toilet",Array<Toilet>::class.java)
		// このときのレスポンスを beforeArray として記憶。
		val beforeArray = response.body!!
		// localhost/todos に POSTリクエストを送る。
		val request = ToiletRequest("テスト公園２","テスト市２",99.999999,135.555555,9,9,9,9,true,true,true )
		restTemplate.postForEntity("http://localhost:$port/api/toilet",request,String::class.java)
		// ふたたび localhost/toilet に GETリクエストを送り、レスポンスを Toiletオブジェクトの配列として解釈する。
		val response2 = restTemplate.getForEntity("http://localhost:$port/api/toilet", Array<Toilet>::class.java)
		// このときのレスポンスを afterArray として記憶。
		val afterArray = response2.body!!

		// 配列 afterArray は、配列 beforeArray よりも 1 要素だけ多い。
		assertThat(afterArray.size, equalTo(beforeArray.size + 1))
		// 配列 afterArray には "hello" をもつTodoオブジェクトが含まれている。
		assertThat(afterArray.map { toilet: Toilet -> toilet.name }, hasItem("テスト公園２"))
	}

	@Test
	fun `GET　ID指定でToilet項目一つを返す`() {
		val response = restTemplate.getForEntity("http://localhost:$port/api/toilet/1", Array<Toilet>::class.java)
		val toilet = response.body!!
		// 取得した要素は1つの配列であること
		assertThat(toilet.size, equalTo(1))
		// 取得した要素は id=1 であり、text が "foo" であること。
		assertThat(toilet[0].id, equalTo(1))
		assertThat(toilet[0].name, equalTo("あぐりん村"))
	}

	@Test
	fun `ID指定でToilet項目をデータベースから削除する`(){
		// localhost/toilet に GETリクエストを送り、レスポンスを Toiletオブジェクトの配列として解釈する。
		val response = restTemplate.getForEntity("http://localhost:$port/api/toilet",Array<Toilet>::class.java)
		// このときのレスポンスを beforeArray として記憶。
		val beforeArray = response.body!!
		//Deleteリクエストを送る。削除するIDは1の{"id":1,"name":"あぐりん村"}
		restTemplate.delete("http://localhost:$port/api/toilet/1")

		// ふたたび localhost/toilet に GETリクエストを送り、レスポンスを Toiletオブジェクトの配列として解釈する。
		val response2 = restTemplate.getForEntity("http://localhost:$port/api/toilet", Array<Toilet>::class.java)
		// このときのレスポンスを afterArray として記憶。
		val afterArray = response2.body!!
		// 配列 todos2 は、配列 todos1 よりも 1 要素だけ少ない。
		assertThat(afterArray.size, equalTo(beforeArray.size - 1))
	}

}
