package com.sijie.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Random;

@Controller
public class TestController {

    @RequestMapping("/test")
    public String test(Model model) {
        model.addAttribute("msg", "This is test page");
        return "test";
    }

    @RequestMapping("/test.jpg")
    @ResponseBody
    public String testJpg() {
        return "test jpg";
    }

    @RequestMapping("/cookie")
    @ResponseBody
    public void getCookie(HttpServletRequest request, HttpServletResponse response) {
        Cookie c = new Cookie("name", "JasonYu");

        response.addCookie(c);
    }

    @RequestMapping("/session")
    @ResponseBody
    public void createSession(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        if (session.isNew()) {
            try (PrintWriter out = response.getWriter()) {
                out.write("Create a New Session\n");

            } catch (IOException exception) {
                exception.printStackTrace();
            }
        }

        session.setAttribute("random", new Random().nextLong());
    }

    @RequestMapping("/session/get")
    @ResponseBody
    public void getSession(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        try (PrintWriter out = response.getWriter()) {
            if (session != null) {
                out.write("current sessionId: " + session.getId() + "\n");
                long number = (Long) session.getAttribute("random");
                out.write("random number: " + String.valueOf(number) + "\n");
            } else {
                out.write("Does not have session");
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }

    }
}
