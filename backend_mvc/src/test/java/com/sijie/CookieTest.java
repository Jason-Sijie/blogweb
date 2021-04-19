package com.sijie;

import org.junit.Test;

import javax.servlet.http.Cookie;

public class CookieTest {

    @Test
    public void CookieTest1() {
        String name = "Jason Yu";
        Cookie cookie = new Cookie("name", name);

        System.out.println(cookie);

        Cookie cookie2 = new Cookie("name", name);
        System.out.println(cookie2);

        System.out.println(cookie == cookie2);
    }
}
