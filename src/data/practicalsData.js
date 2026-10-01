export const practicalsData = [
  {
    id: "1A",
    title: "Calculator Servlet",
    category: "Servlets",
    aim: "To build a simple Calculator in Java Servlets and display computation results on the browser.",
    mentalModel: "1. The browser submits two numbers and an operator. 2. Servlet extracts values with request.getParameter(), parses them to doubles, and uses a Java switch-case to evaluate. 3. Output is written back to the client using PrintWriter.",
    flowSteps: [
      { step: "1", title: "User Input", desc: "User inputs num1, num2, and selects operation (+, -, *, /) on index.html" },
      { step: "2", title: "HTTP POST", desc: "Form dispatches request to /CalculatorServlet" },
      { step: "3", title: "Servlet Computation", desc: "Servlet parses doubles, checks for division by zero, executes switch logic" },
      { step: "4", title: "HTML Response", desc: "Servlet outputs generated HTML with Result and a Back link" }
    ],
    netbeansSteps: [
      "File -> New Project -> Java Web -> Web Application -> Practical1A (GlassFish Server)",
      "Right-click Web Pages -> New -> HTML File -> Name: index.html",
      "Right-click Source Packages -> New -> Java Package -> Name: mypack",
      "Right-click mypack -> New -> Servlet -> Name: CalculatorServlet"
    ],
    sql: null,
    files: [
      {
        name: "index.html",
        language: "html",
        code: `<!DOCTYPE html>
<html>
<head>
  <title>Simple Calculator</title>
</head>
<body>
  <h2>Simple Calculator</h2>
  <form action="CalculatorServlet" method="post">
    First Number:
    <input type="number" name="num1" required><br><br>
    
    Second Number:
    <input type="number" name="num2" required><br><br>
    
    <select name="operation">
      <option value="add">Addition</option>
      <option value="sub">Subtraction</option>
      <option value="mul">Multiplication</option>
      <option value="div">Division</option>
    </select><br><br>
    
    <input type="submit" value="Calculate">
  </form>
</body>
</html>`
      },
      {
        name: "CalculatorServlet.java",
        language: "java",
        code: `package mypack;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/CalculatorServlet")
public class CalculatorServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    
    double num1 = Double.parseDouble(request.getParameter("num1"));
    double num2 = Double.parseDouble(request.getParameter("num2"));
    String operation = request.getParameter("operation");
    double result = 0;
    
    switch (operation) {
      case "add":
        result = num1 + num2;
        break;
      case "sub":
        result = num1 - num2;
        break;
      case "mul":
        result = num1 * num2;
        break;
      case "div":
        if (num2 != 0) {
          result = num1 / num2;
        } else {
          out.println("<h2>Cannot divide by zero!</h2>");
          return;
        }
        break;
      default:
        out.println("<h2>Invalid operation!</h2>");
        return;
    }
    
    out.println("<html><body>");
    out.println("<h2>Result = " + result + "</h2>");
    out.println("<a href='index.html'>Back</a>");
    out.println("</body></html>");
  }
}`
      }
    ],
    keyPoints: [
      "request.getParameter('fieldName') always returns a String. Convert with Double.parseDouble().",
      "Always guard against division by zero (num2 != 0) before division.",
      "response.setContentType('text/html') informs the browser to render output as HTML."
    ]
  },
  {
    id: "1B",
    title: "Login Servlet",
    category: "Servlets",
    aim: "To build a basic Authentication Servlet verifying username and password.",
    mentalModel: "Read credentials from the HTTP request, compare them to authorized values using String.equals(), and print conditional success or failure feedback.",
    flowSteps: [
      { step: "1", title: "Credentials Form", desc: "User inputs username and password on index.html" },
      { step: "2", title: "POST to Servlet", desc: "Submitted to /LoginServlet via HTTP POST" },
      { step: "3", title: "Authentication", desc: "Checks if username.equals('admin') && password.equals('1234')" },
      { step: "4", title: "Feedback", desc: "Prints Hello <user> or Login Failed" }
    ],
    netbeansSteps: [
      "File -> New Project -> Java Web -> Web Application -> Practical1B",
      "Create index.html in Web Pages",
      "Create LoginServlet in package mypack"
    ],
    sql: null,
    files: [
      {
        name: "index.html",
        language: "html",
        code: `<!DOCTYPE html>
<html>
<head>
  <title>Login Page</title>
</head>
<body>
  <h2>Login Form</h2>
  <form action="LoginServlet" method="post">
    Username: <input type="text" name="username" required><br><br>
    Password: <input type="password" name="password" required><br><br>
    <input type="submit" value="Login">
  </form>
</body>
</html>`
      },
      {
        name: "LoginServlet.java",
        language: "java",
        code: `package mypack;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    
    String username = request.getParameter("username");
    String password = request.getParameter("password");
    
    if ("admin".equals(username) && "1234".equals(password)) {
      out.println("<h2>Hello " + username + "</h2>");
    } else {
      out.println("<h2>Login Failed</h2>");
    }
  }
}`
      }
    ],
    keyPoints: [
      "Use 'constant'.equals(variable) rather than variable.equals('constant') to avoid accidental NullPointerExceptions.",
      "Input types password hide sensitive characters on screen."
    ]
  },
  {
    id: "1C",
    title: "Registration Servlet with JDBC",
    category: "JDBC",
    aim: "To create a Registration Servlet and store form input into a Java DB (Derby) database table.",
    mentalModel: "1. Create table in Java DB. 2. In Servlet doPost, load the Derby client driver. 3. Establish Connection to localhost:1527. 4. Use PreparedStatement to safely execute INSERT with placeholder values (?, ?).",
    flowSteps: [
      { step: "1", title: "Form Submission", desc: "User fills username, password, email, country" },
      { step: "2", title: "Servlet Extraction", desc: "RegistrationServlet extracts form parameters" },
      { step: "3", title: "JDBC Insert", desc: "Derby ClientDriver connects to studentdb; PreparedStatement executes INSERT" },
      { step: "4", title: "Result Feedback", desc: "Checks executeUpdate() > 0 and displays status" }
    ],
    netbeansSteps: [
      "Services Tab -> Databases -> Java DB -> Start Server",
      "Right-click Java DB -> Create Database -> DB Name: studentdb, User: app, Pass: app",
      "Right-click connection node -> Execute Command -> Run CREATE TABLE SQL",
      "In Project -> Libraries -> Right-click -> Add Library -> Java DB Driver",
      "Create RegistrationServlet in package mypack"
    ],
    sql: `CREATE TABLE USERS (
  ID INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  USERNAME VARCHAR(50) NOT NULL,
  PASSWORD VARCHAR(50) NOT NULL,
  EMAIL VARCHAR(100) NOT NULL,
  COUNTRY VARCHAR(50) NOT NULL
);`,
    files: [
      {
        name: "index.html",
        language: "html",
        code: `<!DOCTYPE html>
<html>
<head><title>User Registration</title></head>
<body>
  <h2>User Registration</h2>
  <form action="RegistrationServlet" method="post">
    Username: <input type="text" name="username" required><br><br>
    Password: <input type="password" name="password" required><br><br>
    Email: <input type="email" name="email" required><br><br>
    Country: <input type="text" name="country" required><br><br>
    <input type="submit" value="Register">
  </form>
</body>
</html>`
      },
      {
        name: "RegistrationServlet.java",
        language: "java",
        code: `package mypack;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/RegistrationServlet")
public class RegistrationServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    
    String username = request.getParameter("username");
    String password = request.getParameter("password");
    String email = request.getParameter("email");
    String country = request.getParameter("country");
    
    try {
      Class.forName("org.apache.derby.jdbc.ClientDriver");
      Connection con = DriverManager.getConnection(
          "jdbc:derby://localhost:1527/studentdb", "app", "app");
      
      String sql = "INSERT INTO USERS (USERNAME, PASSWORD, EMAIL, COUNTRY) VALUES (?, ?, ?, ?)";
      PreparedStatement ps = con.prepareStatement(sql);
      ps.setString(1, username);
      ps.setString(2, password);
      ps.setString(3, email);
      ps.setString(4, country);
      
      int result = ps.executeUpdate();
      if (result > 0) {
        out.println("<h2>Registration Successful!</h2>");
        out.println("<p>Welcome " + username + "</p>");
      } else {
        out.println("<h2>Registration Failed!</h2>");
      }
      ps.close();
      con.close();
    } catch (Exception e) {
      out.println("<h2>Database Error</h2><p>" + e.getMessage() + "</p>");
    }
  }
}`
      }
    ],
    keyPoints: [
      "Driver class for Java DB: 'org.apache.derby.jdbc.ClientDriver'.",
      "URL format: 'jdbc:derby://localhost:1527/<dbName>'.",
      "Always set placeholders (1-indexed) before calling ps.executeUpdate()."
    ]
  },
  {
    id: "2A",
    title: "Request Dispatcher (forward vs include)",
    category: "Servlets",
    aim: "To demonstrate server-side request routing using RequestDispatcher forward() on valid input and include() on invalid input.",
    mentalModel: "forward() passes full request control to another servlet (the original servlet output is discarded). include() includes the target resource alongside output written by the current servlet.",
    flowSteps: [
      { step: "1", title: "Submit Form", desc: "User enters username and password in index.html" },
      { step: "2", title: "ValidateServlet", desc: "Checks password == 'Servlet'" },
      { step: "3A", title: "Success Path", desc: "rd.forward(request, response) to WelcomeServlet" },
      { step: "3B", title: "Failure Path", desc: "Prints 'Invalid Password', then rd.include(request, response) with index.html" }
    ],
    netbeansSteps: [
      "Create Web Application Practical2A",
      "Create index.html",
      "Create ValidateServlet.java and WelcomeServlet.java in package mypack"
    ],
    sql: null,
    files: [
      {
        name: "index.html",
        language: "html",
        code: `<!DOCTYPE html>
<html>
<head><title>Login Form</title></head>
<body>
  <h2>Enter Password</h2>
  <form action="ValidateServlet" method="post">
    Name: <input type="text" name="username"><br><br>
    Password: <input type="password" name="password"><br><br>
    <input type="submit" value="Login">
  </form>
</body>
</html>`
      },
      {
        name: "ValidateServlet.java",
        language: "java",
        code: `package mypack;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.*;
import javax.servlet.http.*;

public class ValidateServlet extends HttpServlet {
  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    String password = request.getParameter("password");
    
    if ("Servlet".equals(password)) {
      RequestDispatcher rd = request.getRequestDispatcher("WelcomeServlet");
      rd.forward(request, response);
    } else {
      out.println("<font color='red'>Invalid Password</font><br><br>");
      RequestDispatcher rd = request.getRequestDispatcher("/index.html");
      rd.include(request, response);
    }
  }

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
}`
      },
      {
        name: "WelcomeServlet.java",
        language: "java",
        code: `package mypack;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.*;
import javax.servlet.http.*;

public class WelcomeServlet extends HttpServlet {
  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    String name = request.getParameter("username");
    
    out.println("<html><body>");
    out.println("<h1>Welcome " + name + "</h1>");
    out.println("</body></html>");
  }

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
}`
      }
    ],
    keyPoints: [
      "RequestDispatcher is retrieved using request.getRequestDispatcher('path').",
      "forward() switches control entirely; include() merges output.",
      "The request object keeps all original parameters during both forward and include."
    ]
  },
  {
    id: "2B",
    title: "Cookie Visit Counter",
    category: "Servlets",
    aim: "To track and count user visits using browser HTTP cookies in a Servlet.",
    mentalModel: "Cookies live on the client browser. 1. Read existing cookies via request.getCookies(). 2. Search for the named cookie. 3. If found, parse and increment; if not, initialize to 1. 4. Write back via response.addCookie().",
    flowSteps: [
      { step: "1", title: "Request", desc: "Browser requests VisitCounterServlet, sending existing cookies in headers" },
      { step: "2", title: "Cookie Lookup", desc: "Servlet scans array for cookie named 'visitCount'" },
      { step: "3", title: "Increment", desc: "Count is incremented (or initialized to 1 on first visit)" },
      { step: "4", title: "Response Cookie", desc: "response.addCookie(new Cookie('visitCount', ...)) sent back to browser" }
    ],
    netbeansSteps: [
      "Create Web Application Practical2B",
      "Create index.html with link to VisitCounterServlet",
      "Create VisitCounterServlet in package mypack"
    ],
    sql: null,
    files: [
      {
        name: "index.html",
        language: "html",
        code: `<!DOCTYPE html>
<html>
<head><title>Cookie Example</title></head>
<body>
  <h2>Cookie Visit Counter</h2>
  <a href="VisitCounterServlet">Visit Servlet</a>
</body>
</html>`
      },
      {
        name: "VisitCounterServlet.java",
        language: "java",
        code: `package mypack;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class VisitCounterServlet extends HttpServlet {
  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    
    int count = 0;
    boolean found = false;
    Cookie[] cookies = request.getCookies();
    
    if (cookies != null) {
      for (Cookie c : cookies) {
        if ("visitCount".equals(c.getName())) {
          count = Integer.parseInt(c.getValue());
          count++;
          found = true;
          Cookie cookie = new Cookie("visitCount", String.valueOf(count));
          response.addCookie(cookie);
          break;
        }
      }
    }
    
    if (!found) {
      count = 1;
      Cookie cookie = new Cookie("visitCount", String.valueOf(count));
      response.addCookie(cookie);
    }
    
    out.println("<html><body>");
    out.println("<h2>You have visited this servlet " + count + " times.</h2>");
    out.println("</body></html>");
  }

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
}`
      }
    ],
    keyPoints: [
      "Always check if cookies != null before iterating, because first-time requests have no cookies.",
      "Cookie values are stored as Strings: use Integer.parseInt() and String.valueOf().",
      "Cookies are attached to the response via response.addCookie()."
    ]
  },
  {
    id: "2C",
    title: "Session Tracking & Invalidation",
    category: "Servlets",
    aim: "To demonstrate session creation, user visit tracking, and session destruction using HttpSession.",
    mentalModel: "HttpSession stores data on the server. request.getSession() gets or creates a session. session.getAttribute() reads stored objects. session.invalidate() purges the session on logout.",
    flowSteps: [
      { step: "1", title: "Visit Page", desc: "User hits SessionServlet via link" },
      { step: "2", title: "Check Session", desc: "session.getAttribute('user') checked: null means first visit, set to 'Visitor'" },
      { step: "3", title: "Logout", desc: "User clicks Logout link leading to LogoutServlet" },
      { step: "4", title: "Invalidate", desc: "request.getSession(false).invalidate() completely destroys server session" }
    ],
    netbeansSteps: [
      "Create Web Application Practical2C",
      "Create index.html, SessionServlet.java, and LogoutServlet.java in package mypack"
    ],
    sql: null,
    files: [
      {
        name: "SessionServlet.java",
        language: "java",
        code: `package mypack;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class SessionServlet extends HttpServlet {
  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    
    HttpSession session = request.getSession();
    String user = (String) session.getAttribute("user");
    
    out.println("<html><body>");
    if (user == null) {
      session.setAttribute("user", "Visitor");
      out.println("<h2>Welcome!</h2><h3>This is your FIRST visit.</h3>");
    } else {
      out.println("<h2>Welcome Back!</h2><h3>You have visited earlier.</h3>");
    }
    out.println("<br><a href='LogoutServlet'>Logout</a>");
    out.println("</body></html>");
  }

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
}`
      },
      {
        name: "LogoutServlet.java",
        language: "java",
        code: `package mypack;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LogoutServlet extends HttpServlet {
  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    
    HttpSession session = request.getSession(false);
    if (session != null) {
      session.invalidate();
    }
    
    out.println("<html><body>");
    out.println("<h2>Session Destroyed Successfully</h2>");
    out.println("<a href='SessionServlet'>Visit Again</a>");
    out.println("</body></html>");
  }

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
}`
      }
    ],
    keyPoints: [
      "request.getSession() returns current session or creates a new one if none exists.",
      "request.getSession(false) returns current session or null if no session exists (ideal for logout).",
      "session.invalidate() unbinds all session attributes and ends session validity."
    ]
  },
  {
    id: "3A",
    title: "File Upload and Download using Servlet",
    category: "Servlets",
    aim: "To upload files to a server directory using MultipartRequest (cos.jar) and download files via binary streaming.",
    mentalModel: "Upload requires form enctype='multipart/form-data' and MultipartRequest to parse and write to disk. Download sets application/octet-stream and Content-Disposition headers and pumps bytes with FileInputStream into response.getOutputStream().",
    flowSteps: [
      { step: "1", title: "Upload Form", desc: "User chooses file and submits multipart form" },
      { step: "2", title: "Save on Disk", desc: "UploadServlet uses MultipartRequest to save file to C:\\uploads" },
      { step: "3", title: "Download Link", desc: "Servlet outputs link to DownloadServlet?file=filename" },
      { step: "4", title: "Byte Streaming", desc: "DownloadServlet reads file into byte buffer and writes to OutputStream" }
    ],
    netbeansSteps: [
      "Create directory manually: C:\\uploads",
      "Add cos.jar: Project Properties -> Libraries -> Add JAR/Folder -> cos.jar",
      "Create index.html, UploadServlet.java, and DownloadServlet.java"
    ],
    sql: null,
    files: [
      {
        name: "index.html",
        language: "html",
        code: `<!DOCTYPE html>
<html>
<head><title>File Upload</title></head>
<body>
  <h2>Upload File</h2>
  <form action="UploadServlet" method="post" enctype="multipart/form-data">
    Select File: <input type="file" name="file"><br><br>
    <input type="submit" value="Upload">
  </form>
</body>
</html>`
      },
      {
        name: "UploadServlet.java",
        language: "java",
        code: `package mypack;

import com.oreilly.servlet.MultipartRequest;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class UploadServlet extends HttpServlet {
  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    
    String path = "C:\\\\uploads";
    MultipartRequest mr = new MultipartRequest(request, path, 10 * 1024 * 1024);
    String filename = mr.getFilesystemName("file");
    
    out.println("<h2>File Uploaded Successfully</h2>");
    out.println("<a href='DownloadServlet?file=" + filename + "'>Download File</a>");
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
}`
      },
      {
        name: "DownloadServlet.java",
        language: "java",
        code: `package mypack;

import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class DownloadServlet extends HttpServlet {
  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    String fileName = request.getParameter("file");
    String filePath = "C:\\\\uploads\\\\" + fileName;
    File file = new File(filePath);
    
    response.setContentType("application/octet-stream");
    response.setHeader("Content-Disposition", "attachment; filename=\\"" + file.getName() + "\\"");
    
    try (FileInputStream fis = new FileInputStream(file);
         OutputStream os = response.getOutputStream()) {
      byte[] buffer = new byte[4096];
      int bytesRead;
      while ((bytesRead = fis.read(buffer)) != -1) {
        os.write(buffer, 0, bytesRead);
      }
    }
  }

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
}`
      }
    ],
    keyPoints: [
      "Multipart form: <form enctype='multipart/form-data'> is mandatory.",
      "cos.jar provides com.oreilly.servlet.MultipartRequest.",
      "Content-Disposition: attachment triggers browser file download modal."
    ]
  },
  {
    id: "3B",
    title: "MCQ Question Answer Application",
    category: "JDBC",
    aim: "To dynamically render an interactive MCQ test from Java DB and evaluate results in a checking Servlet.",
    mentalModel: "MCQServlet queries table MCQ, writes radio buttons with questions, and embeds the correct answer in hidden input fields. CheckServlet loops over received inputs and tallies the score.",
    flowSteps: [
      { step: "1", title: "Start Quiz", desc: "User clicks Start Quiz on index.html" },
      { step: "2", title: "Render Questions", desc: "MCQServlet fetches records and renders radio options + hidden correct answers" },
      { step: "3", title: "Submit Answers", desc: "Form posts to CheckServlet" },
      { step: "4", title: "Score Tally", desc: "CheckServlet compares user choices with hidden answers and outputs score" }
    ],
    netbeansSteps: [
      "Services -> Java DB -> Create Database: QADB (user: root, pass: root)",
      "Execute Table Creation & Insert SQL script",
      "Create MCQServlet.java and CheckServlet.java in package mypack"
    ],
    sql: `CREATE TABLE MCQ (
  ID INT PRIMARY KEY,
  QUESTION VARCHAR(200),
  OPT1 VARCHAR(100), OPT2 VARCHAR(100), OPT3 VARCHAR(100), OPT4 VARCHAR(100),
  ANSWER VARCHAR(100)
);

INSERT INTO MCQ VALUES (1, 'What is Servlet?', 'Java Package', 'Server Side Technology', 'Database', 'Framework', 'Server Side Technology');
INSERT INTO MCQ VALUES (2, 'Which package is used for JDBC?', 'java.sql', 'java.io', 'javax.servlet', 'java.net', 'java.sql');`,
    files: [
      {
        name: "MCQServlet.java",
        language: "java",
        code: `package mypack;

import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class MCQServlet extends HttpServlet {
  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    
    try {
      Class.forName("org.apache.derby.jdbc.ClientDriver");
      Connection con = DriverManager.getConnection("jdbc:derby://localhost:1527/QADB", "root", "root");
      Statement st = con.createStatement();
      ResultSet rs = st.executeQuery("select * from MCQ");
      
      out.println("<html><body><h2>Online MCQ Test</h2>");
      out.println("<form action='CheckServlet' method='post'>");
      
      while (rs.next()) {
        int id = rs.getInt("ID");
        out.println("<hr><h3>" + id + ". " + rs.getString("QUESTION") + "</h3>");
        out.println("<input type='radio' name='q" + id + "' value='" + rs.getString("OPT1") + "'>" + rs.getString("OPT1") + "<br>");
        out.println("<input type='radio' name='q" + id + "' value='" + rs.getString("OPT2") + "'>" + rs.getString("OPT2") + "<br>");
        out.println("<input type='radio' name='q" + id + "' value='" + rs.getString("OPT3") + "'>" + rs.getString("OPT3") + "<br>");
        out.println("<input type='radio' name='q" + id + "' value='" + rs.getString("OPT4") + "'>" + rs.getString("OPT4") + "<br><br>");
        out.println("<input type='hidden' name='ans" + id + "' value='" + rs.getString("ANSWER") + "'>");
      }
      out.println("<input type='submit' value='Submit Quiz'></form></body></html>");
      con.close();
    } catch (Exception e) {
      out.println(e);
    }
  }

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
}`
      },
      {
        name: "CheckServlet.java",
        language: "java",
        code: `package mypack;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class CheckServlet extends HttpServlet {
  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    
    int score = 0;
    int total = 2;
    for (int i = 1; i <= total; i++) {
      String userAnswer = request.getParameter("q" + i);
      String correctAnswer = request.getParameter("ans" + i);
      if (userAnswer != null && userAnswer.equals(correctAnswer)) {
        score++;
      }
    }
    
    out.println("<html><body>");
    out.println("<h1>Quiz Result</h1>");
    out.println("<h2>Total Questions : " + total + "</h2>");
    out.println("<h2>Correct Answers : " + score + "</h2>");
    out.println("<h2>Score : " + score + "/" + total + "</h2>");
    out.println("</body></html>");
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
}`
      }
    ],
    keyPoints: [
      "Hidden input fields (<input type='hidden'>) transmit server-side answer keys cleanly to the grader servlet.",
      "Radio button names match question IDs ('q1', 'q2') to ensure single selection per question."
    ]
  },
  {
    id: "3C",
    title: "Non-Blocking Read Operation",
    category: "Servlets",
    aim: "To demonstrate asynchronous non-blocking stream reads using Servlet 3.1 ReadListener.",
    mentalModel: "Normally read() blocks the servlet thread while waiting for network bytes. In Servlet 3.1 async mode, request.startAsync() unbinds the thread, and a ReadListener receives callbacks (onDataAvailable, onAllDataRead) as chunks arrive.",
    flowSteps: [
      { step: "1", title: "Submit Large Text", desc: "User enters text into textarea on index.html" },
      { step: "2", title: "Async Initiation", desc: "NonBlockingServlet starts async context and attaches ReadListener" },
      { step: "3", title: "Event Callbacks", desc: "Server invokes onDataAvailable() as chunks arrive into buffer" },
      { step: "4", title: "Complete", desc: "onAllDataRead() outputs response and completes async context" }
    ],
    netbeansSteps: [
      "Create Web Application Practical3C",
      "In web.xml: ensure <async-supported>true</async-supported> is added under <servlet>",
      "Create NonBlockingServlet.java",
      "Create regular Java Class: MyReadListener.java (implements ReadListener)"
    ],
    sql: null,
    files: [
      {
        name: "NonBlockingServlet.java",
        language: "java",
        code: `package mypack;

import java.io.IOException;
import javax.servlet.AsyncContext;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class NonBlockingServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    AsyncContext asyncContext = request.startAsync();
    ServletInputStream input = request.getInputStream();
    input.setReadListener(new MyReadListener(input, asyncContext, response));
  }

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { doPost(req, res); }
}`
      },
      {
        name: "MyReadListener.java",
        language: "java",
        code: `package mypack;

import java.io.IOException;
import javax.servlet.AsyncContext;
import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletResponse;

public class MyReadListener implements ReadListener {
  private ServletInputStream input;
  private AsyncContext asyncContext;
  private HttpServletResponse response;
  private StringBuilder data = new StringBuilder();

  public MyReadListener(ServletInputStream input, AsyncContext asyncContext, HttpServletResponse response) {
    this.input = input;
    this.asyncContext = asyncContext;
    this.response = response;
  }

  @Override
  public void onDataAvailable() throws IOException {
    byte[] buffer = new byte[1024];
    int len;
    while (input.isReady() && (len = input.read(buffer)) != -1) {
      data.append(new String(buffer, 0, len));
    }
  }

  @Override
  public void onAllDataRead() throws IOException {
    response.getWriter().println("<html><body>");
    response.getWriter().println("<h2>Data Received Successfully</h2><hr>");
    response.getWriter().println("<b>Entered Text :</b><br><br>");
    response.getWriter().println(data.toString());
    response.getWriter().println("</body></html>");
    asyncContext.complete();
  }

  @Override
  public void onError(Throwable t) {
    t.printStackTrace();
    asyncContext.complete();
  }
}`
      },
      {
        name: "web.xml snippet",
        language: "xml",
        code: `<servlet>
  <servlet-name>NonBlockingServlet</servlet-name>
  <servlet-class>mypack.NonBlockingServlet</servlet-class>
  <async-supported>true</async-supported>
</servlet>
<servlet-mapping>
  <servlet-name>NonBlockingServlet</servlet-name>
  <url-pattern>/NonBlockingServlet</url-pattern>
</servlet-mapping>`
      }
    ],
    keyPoints: [
      "<async-supported>true</async-supported> must be declared in web.xml or via @WebServlet(asyncSupported=true).",
      "MyReadListener is a pure Java class implementing javax.servlet.ReadListener.",
      "Always call asyncContext.complete() in both onAllDataRead() and onError()."
    ]
  },
  {
    id: "4A",
    title: "JSP Intrinsic Objects",
    category: "JSP",
    aim: "To demonstrate the use of pre-defined JSP implicit objects (request, response, session, application, out, config, pageContext, page).",
    mentalModel: "The JSP container automatically instantiates 9 intrinsic objects. You can access methods directly in scriptlets (<% %>) and expressions (<%= %>) without any declaration.",
    flowSteps: [
      { step: "1", title: "Request", desc: "User opens intrinsic.jsp" },
      { step: "2", title: "JSP Translation", desc: "GlassFish translates JSP into a Servlet and provides implicit objects" },
      { step: "3", title: "Output Render", desc: "JSP prints values from request, session, application, and out directly" }
    ],
    netbeansSteps: [
      "Create Web Application Practical4A",
      "Right-click Web Pages -> New -> JSP -> Name: intrinsic.jsp"
    ],
    sql: null,
    files: [
      {
        name: "intrinsic.jsp",
        language: "jsp",
        code: `<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head><title>Intrinsic Objects</title></head>
<body>
  <h2>Values of JSP Intrinsic Objects</h2>
  <hr>
  <b>Request Method :</b> <%= request.getMethod() %><br><br>
  <b>Request URI :</b> <%= request.getRequestURI() %><br><br>
  <b>Server Name :</b> <%= request.getServerName() %><br><br>
  <b>Server Port :</b> <%= request.getServerPort() %><br><br>
  <b>Session ID :</b> <%= session.getId() %><br><br>
  <b>Application Name :</b> <%= application.getServletContextName() %><br><br>
  <%
    out.println("<b>Message using out object :</b> Hello Students");
  %>
</body>
</html>`
      }
    ],
    keyPoints: [
      "request: HttpServletRequest (getMethod, getRequestURI, getServerPort).",
      "session: HttpSession (getId, setAttribute, getAttribute).",
      "application: ServletContext (getServletContextName, getServerInfo).",
      "out: JspWriter (out.println)."
    ]
  },
  {
    id: "4B",
    title: "JSP Form Validation and Data Passing",
    category: "JSP",
    aim: "To validate form input on the server side using JSP scriptlets and pass data to a result view.",
    mentalModel: "Extract parameters in result.jsp. Perform null/empty checks. If valid, render the confirmation; if invalid, render an error message and a return link.",
    flowSteps: [
      { step: "1", title: "Form", desc: "User enters name, age, email, gender, hobbies in index.jsp" },
      { step: "2", title: "Validation Scriptlet", desc: "result.jsp evaluates null and empty checks" },
      { step: "3", title: "Conditional View", desc: "Displays Student Details table or Validation Failed error" }
    ],
    netbeansSteps: [
      "Create Web Application Practical4B",
      "Create index.jsp and result.jsp in Web Pages"
    ],
    sql: null,
    files: [
      {
        name: "index.jsp",
        language: "jsp",
        code: `<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head><title>Student Registration</title></head>
<body>
  <h2>Student Registration Form</h2>
  <form action="result.jsp" method="post">
    Name: <input type="text" name="name" required><br><br>
    Age: <input type="number" name="age" required><br><br>
    Email: <input type="email" name="email" required><br><br>
    Gender:
    <input type="radio" name="gender" value="Male" required>Male
    <input type="radio" name="gender" value="Female">Female<br><br>
    Hobbies:
    <input type="checkbox" name="hobby" value="Reading">Reading
    <input type="checkbox" name="hobby" value="Sports">Sports
    <input type="checkbox" name="hobby" value="Music">Music<br><br>
    <input type="submit" value="Submit">
  </form>
</body>
</html>`
      },
      {
        name: "result.jsp",
        language: "jsp",
        code: `<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
String name = request.getParameter("name");
String age = request.getParameter("age");
String email = request.getParameter("email");
String gender = request.getParameter("gender");
String[] hobbies = request.getParameterValues("hobby");

if (name == null || name.trim().isEmpty() ||
    age == null || age.trim().isEmpty() ||
    email == null || email.trim().isEmpty() ||
    gender == null) {
%>
  <h2 style="color:red">Validation Failed!</h2>
  <a href="index.jsp">Go Back</a>
<%
} else {
%>
<!DOCTYPE html>
<html>
<head><title>Result</title></head>
<body>
  <h2>Student Details</h2><hr>
  <b>Name :</b> <%= name %><br><br>
  <b>Age :</b> <%= age %><br><br>
  <b>Email :</b> <%= email %><br><br>
  <b>Gender :</b> <%= gender %><br><br>
  <b>Hobbies :</b>
  <%
    if (hobbies != null) {
      for (String h : hobbies) {
        out.print(h + " ");
      }
    } else {
      out.print("None");
    }
  %>
</body>
</html>
<%
}
%>`
      }
    ],
    keyPoints: [
      "Use request.getParameterValues('hobby') for multi-selection checkboxes.",
      "Check both null and .trim().isEmpty() to catch whitespace-only inputs."
    ]
  },
  {
    id: "4C",
    title: "JSP Registration & Login using JDBC",
    category: "JDBC",
    aim: "To implement full user signup, database persistence, credential authentication, and session welcome using JSP scriptlets.",
    mentalModel: "register.jsp posts to registerProcess.jsp (executes SQL INSERT, then redirects to login.jsp). login.jsp posts to loginProcess.jsp (executes SQL SELECT, sets session attribute 'user', redirects to welcome.jsp).",
    flowSteps: [
      { step: "1", title: "Registration", desc: "User registers on register.jsp -> registerProcess.jsp inserts into Java DB" },
      { step: "2", title: "Redirect to Login", desc: "Successful insert triggers response.sendRedirect('login.jsp')" },
      { step: "3", title: "Login Process", desc: "loginProcess.jsp verifies credentials using SELECT query" },
      { step: "4", title: "Session Welcome", desc: "Stores username in session and redirects to welcome.jsp" }
    ],
    netbeansSteps: [
      "Services -> Java DB -> Create Database: StudentDB (user: root, pass: root)",
      "Execute CREATE TABLE users SQL",
      "Create register.jsp, registerProcess.jsp, login.jsp, loginProcess.jsp, welcome.jsp in Web Pages"
    ],
    sql: `CREATE TABLE users (
  username VARCHAR(50) PRIMARY KEY,
  password VARCHAR(50),
  email VARCHAR(100)
);`,
    files: [
      {
        name: "registerProcess.jsp",
        language: "jsp",
        code: `<%@page import="java.sql.*"%>
<%
String username = request.getParameter("username");
String password = request.getParameter("password");
String email = request.getParameter("email");

try {
  Class.forName("org.apache.derby.jdbc.ClientDriver");
  Connection con = DriverManager.getConnection("jdbc:derby://localhost:1527/StudentDB", "root", "root");
  PreparedStatement ps = con.prepareStatement("INSERT INTO USERS VALUES(?, ?, ?)");
  ps.setString(1, username);
  ps.setString(2, password);
  ps.setString(3, email);
  int i = ps.executeUpdate();
  con.close();
  if (i > 0) {
    response.sendRedirect("login.jsp");
  }
} catch (Exception e) {
  out.println(e);
}
%>`
      },
      {
        name: "loginProcess.jsp",
        language: "jsp",
        code: `<%@page import="java.sql.*"%>
<%
String username = request.getParameter("username");
String password = request.getParameter("password");

try {
  Class.forName("org.apache.derby.jdbc.ClientDriver");
  Connection con = DriverManager.getConnection("jdbc:derby://localhost:1527/StudentDB", "root", "root");
  PreparedStatement ps = con.prepareStatement("SELECT * FROM USERS WHERE USERNAME=? AND PASSWORD=?");
  ps.setString(1, username);
  ps.setString(2, password);
  ResultSet rs = ps.executeQuery();
  
  if (rs.next()) {
    session.setAttribute("user", username);
    response.sendRedirect("welcome.jsp");
  } else {
    out.println("<h2>Invalid Username or Password</h2>");
  }
  con.close();
} catch (Exception e) {
  out.println(e);
}
%>`
      },
      {
        name: "welcome.jsp",
        language: "jsp",
        code: `<%@page contentType="text/html"%>
<html>
<head><title>Welcome</title></head>
<body>
  <h2>Welcome <%= session.getAttribute("user") %></h2>
</body>
</html>`
      }
    ],
    keyPoints: [
      "response.sendRedirect('page.jsp') directs the client browser to load a new URL.",
      "session.setAttribute('user', username) allows state to persist across different pages."
    ]
  },
  {
    id: "5A",
    title: "JSP Directives & Implicit Objects",
    category: "JSP",
    aim: "To demonstrate the page directive, include directive, and access all implicit objects in a single clean JSP application.",
    mentalModel: "Directives provide instructions to the JSP container (<%@ page ... %>, <%@ include file='...' %>). The include directive statically merges another JSP file at translation time.",
    flowSteps: [
      { step: "1", title: "Create Header", desc: "header.jsp defines reusable header HTML" },
      { step: "2", title: "Include Directive", desc: "index.jsp includes header via <%@ include file='header.jsp' %>" },
      { step: "3", title: "Display All Objects", desc: "Prints request, response, session, application, config, pageContext details" }
    ],
    netbeansSteps: [
      "Create Web Application Practical5A",
      "Create header.jsp and index.jsp in Web Pages"
    ],
    sql: null,
    files: [
      {
        name: "header.jsp",
        language: "jsp",
        code: `<h2>JSP Directives and Implicit Objects</h2>
<hr>`
      },
      {
        name: "index.jsp",
        language: "jsp",
        code: `<%@ page language="java" contentType="text/html" pageEncoding="UTF-8" import="java.util.Date" %>
<%@ include file="header.jsp" %>
<html>
<head><title>JSP Directives and Implicit Objects</title></head>
<body>
  <h3>1. Page Directive</h3>
  <p>Language: Java</p>
  <p>Current Date: <%= new Date() %></p><hr>
  
  <h3>2. Request Implicit Object</h3>
  <p>Request Method: <%= request.getMethod() %></p>
  <p>Request URI: <%= request.getRequestURI() %></p>
  <p>Server Port: <%= request.getServerPort() %></p><hr>
  
  <h3>3. Response Implicit Object</h3>
  <p>Response Content Type: <%= response.getContentType() %></p><hr>
  
  <h3>4. Session Implicit Object</h3>
  <p>Session ID: <%= session.getId() %></p><hr>
  
  <h3>5. Application Implicit Object</h3>
  <p>Server Information: <%= application.getServerInfo() %></p>
  <p>Application Context Path: <%= application.getContextPath() %></p><hr>
  
  <h3>6. Out Implicit Object</h3>
  <% out.println("This message is displayed using the out object."); %><hr>
  
  <h3>7. Config Implicit Object</h3>
  <p>Servlet Name: <%= config.getServletName() %></p><hr>
  
  <h3>8. PageContext Implicit Object</h3>
  <p>Page Context Class: <%= pageContext.getClass().getName() %></p><hr>
  
  <h3>9. Page Implicit Object</h3>
  <p>Page Class: <%= page.getClass().getName() %></p>
</body>
</html>`
      }
    ],
    keyPoints: [
      "<%@ page import='java.util.Date' %> allows importing external Java packages.",
      "<%@ include file='header.jsp' %> performs compile-time inclusion of markup."
    ]
  },
  {
    id: "5B",
    title: "JSP Form Processing & Regex Validation",
    category: "JSP",
    aim: "To demonstrate comprehensive server-side input validation using regular expressions and range checks in JSP.",
    mentalModel: "Validate inputs against strict business criteria: regex for alphabets only, integer parse + range 1-100 for age, regex for standard email syntax, and non-empty checks for checkboxes.",
    flowSteps: [
      { step: "1", title: "Fill Registration Form", desc: "User inputs name, age, email, gender, hobbies" },
      { step: "2", title: "Submit to process.jsp", desc: "Form dispatches via POST" },
      { step: "3", title: "Regex Checks", desc: "Name matches [a-zA-Z ]+, age between 1-100, email regex validated" },
      { step: "4", title: "Render Result", desc: "Displays Form Submitted Successfully or error breakdown" }
    ],
    netbeansSteps: [
      "Create Web Application Practical5B",
      "Create index.jsp and process.jsp in Web Pages"
    ],
    sql: null,
    files: [
      {
        name: "process.jsp",
        language: "jsp",
        code: `<%@ page language="java" contentType="text/html" pageEncoding="UTF-8" %>
<html>
<head><title>Form Processing Result</title></head>
<body>
<h2>Form Processing Result</h2>
<%
  String name = request.getParameter("name");
  String age = request.getParameter("age");
  String email = request.getParameter("email");
  String gender = request.getParameter("gender");
  String[] hobbies = request.getParameterValues("hobby");
  boolean valid = true;

  if (name == null || name.trim().isEmpty()) {
    out.println("<p>Name is required.</p>"); valid = false;
  } else if (!name.matches("[a-zA-Z ]+")) {
    out.println("<p>Name should contain only alphabets.</p>"); valid = false;
  }

  if (age == null || age.trim().isEmpty()) {
    out.println("<p>Age is required.</p>"); valid = false;
  } else {
    try {
      int ageValue = Integer.parseInt(age);
      if (ageValue < 1 || ageValue > 100) {
        out.println("<p>Age must be between 1 and 100.</p>"); valid = false;
      }
    } catch (NumberFormatException e) {
      out.println("<p>Age must contain numbers only.</p>"); valid = false;
    }
  }

  if (email == null || email.trim().isEmpty()) {
    out.println("<p>Email is required.</p>"); valid = false;
  } else if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
    out.println("<p>Enter a valid email address.</p>"); valid = false;
  }

  if (gender == null || gender.trim().isEmpty()) {
    out.println("<p>Please select gender.</p>"); valid = false;
  }

  if (hobbies == null || hobbies.length == 0) {
    out.println("<p>Select at least one hobby.</p>"); valid = false;
  }

  if (valid) {
%>
    <h3>Form Submitted Successfully!</h3>
    <p>Name: <%= name %></p>
    <p>Age: <%= age %></p>
    <p>Email: <%= email %></p>
    <p>Gender: <%= gender %></p>
    <p>Hobbies: 
      <% for (String h : hobbies) { out.print(h + " "); } %>
    </p>
<%
  } else {
%>
    <h3>Form Submission Failed</h3>
    <p>Please correct the above errors.</p>
<%
  }
%>
<br><a href="index.jsp">Go Back to Form</a>
</body>
</html>`
      }
    ],
    keyPoints: [
      "name.matches('[a-zA-Z ]+') enforces alphabetic characters and spaces only.",
      "Email pattern '^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$' verifies standard address structure."
    ]
  },
  {
    id: "5C",
    title: "Display Data from Java DB using JSP",
    category: "JDBC",
    aim: "To fetch records from a Java DB student table and render them dynamically in an HTML table inside JSP.",
    mentalModel: "In JSP scriptlet, load Derby driver, establish connection, execute 'SELECT * FROM student', and iterate rs.next() inside an HTML <tr> loop.",
    flowSteps: [
      { step: "1", title: "Page Request", desc: "User opens index.jsp in browser" },
      { step: "2", title: "Execute SELECT", desc: "JSP connects to Java DB College database and queries student table" },
      { step: "3", title: "Loop Rows", desc: "Iterates through ResultSet rs.next() generating <tr><td> rows" },
      { step: "4", title: "Close Resources", desc: "Finally block guarantees rs, stmt, and con are closed" }
    ],
    netbeansSteps: [
      "Services -> Java DB -> Create Database: College (user: root, pass: root)",
      "Execute CREATE TABLE and INSERT statements",
      "Create index.jsp in Web Pages"
    ],
    sql: `CREATE TABLE student (
  rollno INT PRIMARY KEY,
  name VARCHAR(50),
  age INT,
  course VARCHAR(50)
);

INSERT INTO student VALUES (101, 'Omkar', 24, 'MCA');
INSERT INTO student VALUES (102, 'Rahul', 23, 'BCA');
INSERT INTO student VALUES (103, 'Priya', 22, 'BSc IT');
INSERT INTO student VALUES (104, 'Amit', 24, 'MCA');`,
    files: [
      {
        name: "index.jsp",
        language: "jsp",
        code: `<%@ page language="java" contentType="text/html" pageEncoding="UTF-8" import="java.sql.*" %>
<html>
<head><title>Student Details</title></head>
<body>
<h2>Student Details from Java DB</h2>
<%
  Connection con = null;
  Statement stmt = null;
  ResultSet rs = null;
  try {
    Class.forName("org.apache.derby.jdbc.ClientDriver");
    con = DriverManager.getConnection("jdbc:derby://localhost:1527/College", "root", "root");
    stmt = con.createStatement();
    rs = stmt.executeQuery("SELECT * FROM student");
%>
    <table border="1" cellpadding="8">
      <tr><th>Roll No</th><th>Name</th><th>Age</th><th>Course</th></tr>
<%
      while (rs.next()) {
%>
      <tr>
        <td><%= rs.getInt("rollno") %></td>
        <td><%= rs.getString("name") %></td>
        <td><%= rs.getInt("age") %></td>
        <td><%= rs.getString("course") %></td>
      </tr>
<%
      }
%>
    </table>
<%
  } catch (Exception e) {
    out.println("<p>Error: " + e.getMessage() + "</p>");
  } finally {
    try {
      if (rs != null) rs.close();
      if (stmt != null) stmt.close();
      if (con != null) con.close();
    } catch (Exception e) { e.printStackTrace(); }
  }
%>
</body>
</html>`
      }
    ],
    keyPoints: [
      "Mixing scriptlet loops <% while(rs.next()) { %> with markup <tr>...</tr> creates dynamic HTML tables.",
      "Always clean up JDBC resources in a finally block to prevent connection leaks."
    ]
  },
  {
    id: "6A",
    title: "HTML Form to UPDATE Database Table",
    category: "JDBC",
    aim: "To update an existing employee record in Java DB through an HTML form using PreparedStatement in JSP.",
    mentalModel: "Read updated values plus primary key (eno). Construct SQL UPDATE EMPLOYEE SET NAME=?, AGE=?, DESIGNATION=?, SALARY=? WHERE ENO=?. Check executeUpdate() > 0.",
    flowSteps: [
      { step: "1", title: "Fill Update Form", desc: "User specifies ENO and new name, age, designation, salary" },
      { step: "2", title: "Submit", desc: "POST to update.jsp" },
      { step: "3", title: "Execute UPDATE", desc: "PreparedStatement executes SQL UPDATE with matching ENO" },
      { step: "4", title: "Feedback", desc: "Prints 'Record Updated Successfully' or 'Employee Number Not Found'" }
    ],
    netbeansSteps: [
      "In StudentDB database: run CREATE TABLE EMPLOYEE SQL and insert sample record",
      "Create index.html (Form) and update.jsp (Processing)"
    ],
    sql: `CREATE TABLE EMPLOYEE (
  ENO INT PRIMARY KEY,
  NAME VARCHAR(50),
  AGE INT,
  DESIGNATION VARCHAR(50),
  SALARY DOUBLE
);

INSERT INTO EMPLOYEE VALUES (101, 'Rahul', 25, 'Developer', 35000);`,
    files: [
      {
        name: "index.html",
        language: "html",
        code: `<!DOCTYPE html>
<html>
<head><title>Employee Update</title></head>
<body>
  <h2>Employee Update Form</h2>
  <form action="update.jsp" method="post">
    Employee No : <input type="text" name="eno"><br><br>
    Name : <input type="text" name="name"><br><br>
    Age : <input type="text" name="age"><br><br>
    Designation : <input type="text" name="designation"><br><br>
    Salary : <input type="text" name="salary"><br><br>
    <input type="submit" value="Update Employee">
  </form>
</body>
</html>`
      },
      {
        name: "update.jsp",
        language: "jsp",
        code: `<%@page import="java.sql.*"%>
<%
String eno = request.getParameter("eno");
String name = request.getParameter("name");
String age = request.getParameter("age");
String designation = request.getParameter("designation");
String salary = request.getParameter("salary");

try {
  Class.forName("org.apache.derby.jdbc.ClientDriver");
  Connection con = DriverManager.getConnection("jdbc:derby://localhost:1527/StudentDB", "root", "root");
  
  String sql = "UPDATE EMPLOYEE SET NAME=?, AGE=?, DESIGNATION=?, SALARY=? WHERE ENO=?";
  PreparedStatement ps = con.prepareStatement(sql);
  ps.setString(1, name);
  ps.setInt(2, Integer.parseInt(age));
  ps.setString(3, designation);
  ps.setDouble(4, Double.parseDouble(salary));
  ps.setInt(5, Integer.parseInt(eno));
  
  int i = ps.executeUpdate();
  if (i > 0) {
    out.println("<h2>Employee Record Updated Successfully</h2>");
  } else {
    out.println("<h2>Employee Number Not Found</h2>");
  }
  con.close();
} catch (Exception e) {
  out.println(e);
}
%>`
      }
    ],
    keyPoints: [
      "In SQL UPDATE statements, the primary key parameter goes into the WHERE clause (last placeholder index).",
      "executeUpdate() returning 0 means the query executed fine, but no row matched the given ENO."
    ]
  },
  {
    id: "6B",
    title: "JSP Expression Language (EL)",
    category: "JSP",
    aim: "To demonstrate Expression Language syntax (${...}) accessing parameters, scopes, cookies, headers, and operators without Java scriptlets.",
    mentalModel: "EL replaces <%= expr %> syntax. It automatically traverses implicit maps: param, paramValues, sessionScope, applicationScope, cookie, header.",
    flowSteps: [
      { step: "1", title: "Set Attributes", desc: "index.jsp puts values into application, session, and adds a cookie" },
      { step: "2", title: "Submit Form", desc: "User enters name, age, course, hobbies" },
      { step: "3", title: "EL Resolution", desc: "result.jsp evaluates ${param.name}, ${sessionScope.username}, arithmetic, and ternary operators" }
    ],
    netbeansSteps: [
      "Create Web Application Practical6B",
      "Create index.jsp and result.jsp in Web Pages"
    ],
    sql: null,
    files: [
      {
        name: "result.jsp",
        language: "jsp",
        code: `<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head><title>Expression Language Demo</title></head>
<body>
  <h2>Expression Language Output</h2><hr>
  
  <h3>1. Parameter Object</h3>
  Name: \${param.name}<br>
  Age: \${param.age}<br>
  Course: \${param.course}<hr>
  
  <h3>2. Parameter Values</h3>
  First Hobby: \${paramValues.hobby[0]}<br>
  Second Hobby: \${paramValues.hobby[1]}<hr>
  
  <h3>3. Session Scope</h3>
  Username: \${sessionScope.username}<hr>
  
  <h3>4. Application Scope</h3>
  College: \${applicationScope.college}<hr>
  
  <h3>5. Cookie</h3>
  City: \${cookie.City.value}<hr>
  
  <h3>6. Header Object</h3>
  Browser: \${header["User-Agent"]}<br>
  Host: \${header.Host}<hr>
  
  <h3>7. Operators & Conditionals</h3>
  20 + 10 = \${20 + 10}<br>
  20 > 10 : \${20 > 10}<br>
  Is Address Empty: \${empty param.address}<br>
  Status: \${param.age >= 18 ? "Eligible to Vote" : "Not Eligible"}
</body>
</html>`
      }
    ],
    keyPoints: [
      "\${param.x} retrieves a single request parameter; \${paramValues.x[0]} retrieves array elements.",
      "\${cookie.City.value} accesses the text value of a cookie.",
      "\${empty var} safely checks for null, empty strings, or empty collections."
    ]
  },
  {
    id: "6C",
    title: "JSP Standard Tag Library (JSTL)",
    category: "JSP",
    aim: "To demonstrate JSTL core tags (<c:set>, <c:out>, <c:if>, <c:choose>, <c:forEach>, <c:remove>) for conditional rendering and looping.",
    mentalModel: "JSTL provides XML-style tags that replace raw Java control flow (if/else, for loops) inside JSPs. Requires jstl-1.2.jar.",
    flowSteps: [
      { step: "1", title: "Add Library", desc: "Add JSTL 1.2 to project Libraries" },
      { step: "2", title: "Taglib Directive", desc: "<%@taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>" },
      { step: "3", title: "Process Logic", desc: "result.jsp evaluates grades using <c:choose> and iterates using <c:forEach>" }
    ],
    netbeansSteps: [
      "Create Web Application Practical6C",
      "Libraries -> Add Library -> JSTL 1.2",
      "Create index.jsp and result.jsp"
    ],
    sql: null,
    files: [
      {
        name: "result.jsp",
        language: "jsp",
        code: `<%@page contentType="text/html"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head><title>JSTL Example</title></head>
<body>
  <h2>JSTL Demonstration</h2><hr>
  
  <c:set var="student" value="\${param.name}"/>
  <c:set var="marks" value="\${param.marks}"/>
  
  <h3>Using c:out</h3>
  Name: <c:out value="\${student}"/><br>
  Marks: <c:out value="\${marks}"/><hr>
  
  <h3>Using c:if</h3>
  <c:if test="\${marks >= 35}">Student is Pass</c:if>
  <c:if test="\${marks < 35}">Student is Fail</c:if><hr>
  
  <h3>Using c:choose</h3>
  <c:choose>
    <c:when test="\${marks >= 75}">Grade A</c:when>
    <c:when test="\${marks >= 60}">Grade B</c:when>
    <c:when test="\${marks >= 35}">Grade C</c:when>
    <c:otherwise>Grade F</c:otherwise>
  </c:choose><hr>
  
  <h3>Using c:forEach</h3>
  <c:forEach begin="1" end="5" var="i">
    Roll No: \${i}<br>
  </c:forEach><hr>
  
  <h3>Using c:remove</h3>
  <c:remove var="student"/>
  Student Variable Removed Successfully
</body>
</html>`
      }
    ],
    keyPoints: [
      "JSTL library must be attached; otherwise tags will not be parsed and output raw in HTML.",
      "<c:choose> behaves like a switch statement, with <c:when> as case and <c:otherwise> as default."
    ]
  },
  {
    id: "7A",
    title: "Currency Converter using Stateless EJB",
    category: "EJB",
    aim: "To implement an enterprise currency conversion service using an EJB @Stateless Session Bean.",
    mentalModel: "Stateless beans hold no client-specific conversation state. The EJB container pools instances. Inject the bean into the Servlet using @EJB without calling new.",
    flowSteps: [
      { step: "1", title: "Create Bean", desc: "Create CurrencyBean.java annotated with @Stateless" },
      { step: "2", title: "Inject into Servlet", desc: "@EJB CurrencyBean bean inside CurrencyServlet" },
      { step: "3", title: "Execute Conversion", desc: "Servlet calls bean.convert(amount, type) and returns result" }
    ],
    netbeansSteps: [
      "File -> New Project -> Java Web -> Web Application -> Practical7A (GlassFish Server)",
      "Source Packages -> mypack -> New -> Session Bean -> Name: CurrencyBean, Type: Stateless",
      "Create CurrencyServlet.java with @EJB injection",
      "Create index.jsp"
    ],
    sql: null,
    files: [
      {
        name: "CurrencyBean.java",
        language: "java",
        code: `package mypack;

import javax.ejb.Stateless;

@Stateless
public class CurrencyBean {
  public double convert(double amount, String type) {
    if ("INR_TO_USD".equals(type)) {
      return amount / 85.0;
    } else {
      return amount * 85.0;
    }
  }
}`
      },
      {
        name: "CurrencyServlet.java",
        language: "java",
        code: `package mypack;

import java.io.*;
import javax.ejb.EJB;
import javax.servlet.*;
import javax.servlet.http.*;

public class CurrencyServlet extends HttpServlet {
  @EJB
  private CurrencyBean bean;

  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    
    double amount = Double.parseDouble(request.getParameter("amount"));
    String type = request.getParameter("type");
    double result = bean.convert(amount, type);
    
    out.println("<html><body>");
    out.println("<h2>Currency Converter</h2><br>");
    out.println("Converted Amount = " + result);
    out.println("</body></html>");
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
}`
      }
    ],
    keyPoints: [
      "@Stateless declares an enterprise session bean with no conversational state.",
      "@EJB automatically injects the bean reference managed by GlassFish."
    ]
  },
  {
    id: "7B",
    title: "Room Reservation System using EJB & Java DB",
    category: "EJB",
    aim: "To implement an enterprise room booking system encapsulating database persistence inside a Stateless EJB.",
    mentalModel: "Servlet handles user interaction and form parameter parsing; Stateless EJB encapsulates JDBC database persistence into Java DB RoomDB.",
    flowSteps: [
      { step: "1", title: "Reservation Form", desc: "User inputs name, room type, checkin and checkout dates" },
      { step: "2", title: "Servlet Delegation", desc: "RoomServlet extracts parameters and invokes bean.reserveRoom()" },
      { step: "3", title: "EJB DB Insertion", desc: "RoomBean runs PreparedStatement INSERT INTO reservation" },
      { step: "4", title: "Outcome", desc: "Servlet outputs confirmation" }
    ],
    netbeansSteps: [
      "Services -> Java DB -> Create Database: RoomDB (user: root, pass: root)",
      "Execute CREATE TABLE reservation SQL",
      "Create Stateless Session Bean RoomBean.java",
      "Create RoomServlet.java with @EJB injection",
      "Create index.jsp"
    ],
    sql: `CREATE TABLE reservation (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),
  name VARCHAR(50),
  roomtype VARCHAR(20),
  checkin DATE,
  checkout DATE
);`,
    files: [
      {
        name: "RoomBean.java",
        language: "java",
        code: `package mypack;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import javax.ejb.Stateless;

@Stateless
public class RoomBean {
  public boolean reserveRoom(String name, String room, String checkin, String checkout) {
    try {
      Class.forName("org.apache.derby.jdbc.ClientDriver");
      Connection con = DriverManager.getConnection("jdbc:derby://localhost:1527/RoomDB", "root", "root");
      PreparedStatement ps = con.prepareStatement(
          "INSERT INTO reservation(name, roomtype, checkin, checkout) VALUES(?, ?, ?, ?)");
      ps.setString(1, name);
      ps.setString(2, room);
      ps.setDate(3, java.sql.Date.valueOf(checkin));
      ps.setDate(4, java.sql.Date.valueOf(checkout));
      int i = ps.executeUpdate();
      ps.close();
      con.close();
      return i > 0;
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }
}`
      },
      {
        name: "RoomServlet.java",
        language: "java",
        code: `package mypack;

import java.io.IOException;
import java.io.PrintWriter;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class RoomServlet extends HttpServlet {
  @EJB
  private RoomBean bean;

  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    
    String name = request.getParameter("name");
    String room = request.getParameter("room");
    String checkin = request.getParameter("checkin");
    String checkout = request.getParameter("checkout");
    
    boolean status = bean.reserveRoom(name, room, checkin, checkout);
    out.println("<html><body>");
    out.println("<h2>Room Reservation System</h2>");
    out.println(status ? "<h3>Room Reserved Successfully.</h3>" : "<h3>Reservation Failed.</h3>");
    out.println("<br><a href='index.jsp'>Back</a></body></html>");
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
}`
      }
    ],
    keyPoints: [
      "java.sql.Date.valueOf('YYYY-MM-DD') converts HTML5 date picker input strings directly into SQL dates.",
      "Separating business and database logic into EJBs improves code testability and transaction management."
    ]
  },
  {
    id: "7C",
    title: "Shopping Cart with Stateful Session Bean",
    category: "EJB",
    aim: "To maintain user cart items across multiple HTTP requests using an EJB @Stateful Session Bean.",
    mentalModel: "Unlike Stateless beans, a @Stateful bean instance maintains its instance variables (like an ArrayList cart) dedicated to one specific client session throughout their interactions.",
    flowSteps: [
      { step: "1", title: "Select Product", desc: "User chooses product (Laptop, Mobile) and clicks Add or Clear" },
      { step: "2", title: "Stateful Mutation", desc: "CartServlet calls bean.addItem() or bean.clearCart()" },
      { step: "3", title: "State Retention", desc: "Stateful bean retains all previously added items in memory" },
      { step: "4", title: "Display List", desc: "Servlet outputs accumulated cart items and total count" }
    ],
    netbeansSteps: [
      "Create Web Application Practical7C",
      "New -> Session Bean -> Name: ShoppingCartBean, Type: Stateful",
      "Create CartServlet.java with @EJB injection",
      "Create index.jsp"
    ],
    sql: null,
    files: [
      {
        name: "ShoppingCartBean.java",
        language: "java",
        code: `package mypack;

import java.util.ArrayList;
import javax.ejb.Stateful;

@Stateful
public class ShoppingCartBean {
  private ArrayList<String> cart = new ArrayList<String>();

  public void addItem(String item) { cart.add(item); }
  public ArrayList<String> getItems() { return cart; }
  public int getTotalItems() { return cart.size(); }
  public void clearCart() { cart.clear(); }
}`
      },
      {
        name: "CartServlet.java",
        language: "java",
        code: `package mypack;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class CartServlet extends HttpServlet {
  @EJB
  private ShoppingCartBean bean;

  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    
    String item = request.getParameter("item");
    String action = request.getParameter("action");
    
    if ("Add".equals(action)) {
      bean.addItem(item);
    } else if ("Clear".equals(action)) {
      bean.clearCart();
    }
    
    ArrayList<String> cart = bean.getItems();
    out.println("<html><body><h2>Shopping Cart</h2>");
    out.println("<b>Items in Cart:</b><br><br>");
    for (String s : cart) {
      out.println(s + "<br>");
    }
    out.println("<br>Total Items : " + bean.getTotalItems() + "<br><br>");
    out.println("<a href='index.jsp'>Back</a></body></html>");
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
}`
      }
    ],
    keyPoints: [
      "@Stateful session beans retain memory state for the client as long as the session lives.",
      "Ideal for multi-step wizards, reservations, and ecommerce carts without touching the database repeatedly."
    ]
  },
  {
    id: "8A",
    title: "Servlet Hit Counter with Singleton EJB",
    category: "EJB",
    aim: "To implement an application-wide global visit counter using an EJB @Singleton Session Bean.",
    mentalModel: "@Singleton guarantees exactly one instance exists across the entire JVM. All users share the same hitCounter count.",
    flowSteps: [
      { step: "1", title: "Visit Servlet", desc: "Any user clicks Visit Servlet" },
      { step: "2", title: "Singleton Increment", desc: "HitServlet calls bean.getHitCount() on shared Singleton" },
      { step: "3", title: "Global Count", desc: "Count increments globally and displays updated hit total" }
    ],
    netbeansSteps: [
      "Create Web Application Practical8A",
      "New -> Session Bean -> Name: HitCounterBean, Type: Singleton",
      "Create HitServlet.java with @EJB HitCounterBean",
      "Create index.jsp"
    ],
    sql: null,
    files: [
      {
        name: "HitCounterBean.java",
        language: "java",
        code: `package mypack;

import javax.ejb.Singleton;

@Singleton
public class HitCounterBean {
  private int count = 0;

  public int getHitCount() {
    count++;
    return count;
  }
}`
      },
      {
        name: "HitServlet.java",
        language: "java",
        code: `package mypack;

import java.io.IOException;
import java.io.PrintWriter;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class HitServlet extends HttpServlet {
  @EJB
  private HitCounterBean bean;

  protected void processRequest(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    int hits = bean.getHitCount();
    
    out.println("<html><body>");
    out.println("<h2>Servlet Hit Counter Using Singleton EJB</h2><br>");
    out.println("<h3>Total Hits : " + hits + "</h3><br>");
    out.println("<a href='index.jsp'>Refresh Again</a>");
    out.println("</body></html>");
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException { processRequest(req, res); }
}`
      }
    ],
    keyPoints: [
      "@Singleton maintains one instance for the entire application.",
      "Useful for counters, global caches, and background schedulers."
    ]
  },
  {
    id: "8B",
    title: "Visitor Statistics using Message Driven Bean [MDB]",
    category: "EJB",
    aim: "To demonstrate asynchronous processing using JMS Queues and an EJB @MessageDriven Bean.",
    mentalModel: "The Servlet acts as a JMS MessageProducer putting messages onto a Queue. The MDB acts as a MessageListener processing messages asynchronously in the background and updating a shared Singleton bean.",
    flowSteps: [
      { step: "1", title: "Submit Visitor", desc: "User submits name and city" },
      { step: "2", title: "Produce JMS Message", desc: "VisitorServlet sends TextMessage into jms/VisitorQueue" },
      { step: "3", title: "Asynchronous MDB", desc: "VisitorStatsMDB receives onMessage() and logs visit into VisitorStatsBean" },
      { step: "4", title: "Display View", desc: "stats.jsp renders updated statistics" }
    ],
    netbeansSteps: [
      "Create Web Application Practical8B",
      "Configure JMS Resources in WEB-INF/glassfish-resources.xml",
      "Create VisitorStatsBean.java (@Singleton)",
      "Create VisitorStatsMDB.java (@MessageDriven implements MessageListener)",
      "Create VisitorServlet.java (JMS Producer) and stats.jsp"
    ],
    sql: null,
    files: [
      {
        name: "glassfish-resources.xml",
        language: "xml",
        code: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE resources PUBLIC "-//GlassFish.org//DTD GlassFish Application Server 3.1 Resource Definitions//EN"
 "http://glassfish.org/dtds/glassfish-resources_1_5.dtd">
<resources>
  <admin-object-resource enabled="true" jndi-name="jms/VisitorQueue"
                         res-type="javax.jms.Queue" res-adapter="jmsra">
    <property name="Name" value="PhysicalQueue"/>
  </admin-object-resource>
  <connector-connection-pool name="jms/VisitorQueueFactoryPool"
                             connection-definition-name="javax.jms.QueueConnectionFactory"
                             resource-adapter-name="jmsra"/>
  <connector-resource enabled="true" jndi-name="jms/VisitorQueueFactory"
                      pool-name="jms/VisitorQueueFactoryPool"/>
</resources>`
      },
      {
        name: "VisitorStatsMDB.java",
        language: "java",
        code: `package ejb;

import java.text.SimpleDateFormat;
import java.util.Date;
import javax.ejb.*;
import javax.jms.*;

@MessageDriven(mappedName = "jms/VisitorQueue", activationConfig = {
  @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "javax.jms.Queue")
})
public class VisitorStatsMDB implements MessageListener {
  @EJB
  private VisitorStatsBean statsBean;

  @Override
  public void onMessage(Message message) {
    try {
      if (message instanceof TextMessage) {
        String visitorDetails = ((TextMessage) message).getText();
        String timeStamp = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(new Date());
        String logEntry = visitorDetails + " (Logged at: " + timeStamp + ")";
        statsBean.recordVisit(logEntry);
      }
    } catch (JMSException e) {
      e.printStackTrace();
    }
  }
}`
      }
    ],
    keyPoints: [
      "@MessageDriven beans do not have business interfaces; they implement MessageListener.",
      "Enables decoupled, non-blocking asynchronous architectures."
    ]
  },
  {
    id: "9A",
    title: "Simple Inventory Application using JPA",
    category: "JPA",
    aim: "To build an inventory management application mapping an Item entity to Java DB via JPA without writing raw SQL.",
    mentalModel: "JPA eliminates SQL queries. 1. Create Item entity with @Entity and @Id. 2. Configure persistence.xml. 3. Use EntityManager to em.persist() items and em.createQuery('SELECT i FROM Item i', Item.class).getResultList().",
    flowSteps: [
      { step: "1", title: "Create DB & PU", desc: "Create inventorydb; configure InventoryPU in persistence.xml" },
      { step: "2", title: "Create Entity", desc: "Item.java annotated with @Entity, @Id, @GeneratedValue" },
      { step: "3", title: "Save Item", desc: "InventoryServlet doPost: em.getTransaction().begin(); em.persist(item); em.getTransaction().commit();" },
      { step: "4", title: "Fetch All", desc: "InventoryServlet doGet: em.createQuery(...) passes items list to inventory.jsp" }
    ],
    netbeansSteps: [
      "Services -> Java DB -> Create Database: inventorydb (user: root, pass: root)",
      "Create Web Application Practical9A",
      "New -> Other -> Persistence -> Persistence Unit -> Name: InventoryPU, Provider: EclipseLink",
      "New -> Entity Class -> Name: Item, Package: entity",
      "Create InventoryServlet.java and inventory.jsp"
    ],
    sql: null,
    files: [
      {
        name: "Item.java",
        language: "java",
        code: `package entity;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "INVENTORY_ITEMS")
public class Item implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String itemName;
  private int quantity;
  private double price;

  public Item() {}
  public Item(String itemName, int quantity, double price) {
    this.itemName = itemName;
    this.quantity = quantity;
    this.price = price;
  }

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getItemName() { return itemName; }
  public void setItemName(String itemName) { this.itemName = itemName; }
  public int getQuantity() { return quantity; }
  public void setQuantity(int quantity) { this.quantity = quantity; }
  public double getPrice() { return price; }
  public void setPrice(double price) { this.price = price; }
}`
      },
      {
        name: "InventoryServlet.java",
        language: "java",
        code: `package servlet;

import entity.Item;
import java.io.IOException;
import java.util.List;
import javax.persistence.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet(name = "InventoryServlet", urlPatterns = {"/InventoryServlet"})
public class InventoryServlet extends HttpServlet {
  private EntityManagerFactory emf;

  @Override
  public void init() throws ServletException {
    emf = Persistence.createEntityManagerFactory("InventoryPU");
  }

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    EntityManager em = emf.createEntityManager();
    try {
      List<Item> items = em.createQuery("SELECT i FROM Item i", Item.class).getResultList();
      request.setAttribute("items", items);
      request.getRequestDispatcher("inventory.jsp").forward(request, response);
    } finally {
      em.close();
    }
  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    String name = request.getParameter("itemName");
    int quantity = Integer.parseInt(request.getParameter("quantity"));
    double price = Double.parseDouble(request.getParameter("price"));

    EntityManager em = emf.createEntityManager();
    try {
      em.getTransaction().begin();
      Item item = new Item(name, quantity, price);
      em.persist(item);
      em.getTransaction().commit();
    } finally {
      em.close();
    }
    response.sendRedirect("InventoryServlet");
  }

  @Override
  public void destroy() {
    if (emf != null && emf.isOpen()) emf.close();
  }
}`
      }
    ],
    keyPoints: [
      "EntityManagerFactory is heavy: create once in init() and close in destroy().",
      "EntityManager is lightweight: create per request and close in a finally block.",
      "Transactions are mandatory for write operations: begin() -> persist() -> commit()."
    ]
  },
  {
    id: "9B",
    title: "Guestbook Application using JPA",
    category: "JPA",
    aim: "To persist timestamped guestbook entries into Java DB using JPA @Temporal annotations.",
    mentalModel: "Similar to Practical 9A, but uses @Temporal(TemporalType.TIMESTAMP) to save java.util.Date and JPQL 'ORDER BY g.id DESC' to show recent entries first.",
    flowSteps: [
      { step: "1", title: "Create Database", desc: "Create guestbookdb in Java DB" },
      { step: "2", title: "Entity Setup", desc: "GuestbookEntry with @Temporal(TemporalType.TIMESTAMP) Date postDate" },
      { step: "3", title: "Persist Entry", desc: "GuestbookServlet doPost persists entry with current timestamp" },
      { step: "4", title: "Render Feed", desc: "guestbook.jsp renders entries with formatted dates" }
    ],
    netbeansSteps: [
      "Services -> Java DB -> Create Database: guestbookdb",
      "New -> Persistence Unit: GuestbookPU",
      "Create Entity Class: GuestbookEntry.java",
      "Create GuestbookServlet.java and guestbook.jsp"
    ],
    sql: null,
    files: [
      {
        name: "GuestbookEntry.java",
        language: "java",
        code: `package entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

@Entity
@Table(name = "GUESTBOOK_ENTRIES")
public class GuestbookEntry implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String email;
  private String message;

  @Temporal(TemporalType.TIMESTAMP)
  private Date postDate;

  public GuestbookEntry() {}
  public GuestbookEntry(String name, String email, String message, Date postDate) {
    this.name = name;
    this.email = email;
    this.message = message;
    this.postDate = postDate;
  }

  public Long getId() { return id; }
  public String getName() { return name; }
  public String getEmail() { return email; }
  public String getMessage() { return message; }
  public Date getPostDate() { return postDate; }
}`
      }
    ],
    keyPoints: [
      "@Temporal(TemporalType.TIMESTAMP) bridges Java Date objects to SQL TIMESTAMP columns.",
      "JPQL query: 'SELECT g FROM GuestbookEntry g ORDER BY g.id DESC' sorts results in reverse chronological order."
    ]
  },
  {
    id: "10A",
    title: "JPA ORM Associations (One-to-Many & Many-to-One)",
    category: "JPA",
    aim: "To demonstrate bidirectional ORM mapping between Department (@OneToMany) and Employee (@ManyToOne).",
    mentalModel: "Department has a List<Employee> marked with @OneToMany(mappedBy='department', cascade=CascadeType.ALL). Employee has a Department marked with @ManyToOne and @JoinColumn(name='DEPT_ID').",
    flowSteps: [
      { step: "1", title: "Create associationdb", desc: "Create database in Java DB" },
      { step: "2", title: "Entities", desc: "Department entity has @OneToMany; Employee entity has @ManyToOne" },
      { step: "3", title: "Bi-directional Link", desc: "Helper method dept.addEmployee(emp) synchronizes both sides" },
      { step: "4", title: "Fetch Join", desc: "SELECT DISTINCT d FROM Department d LEFT JOIN FETCH d.employees avoids lazy load issues" }
    ],
    netbeansSteps: [
      "Create associationdb in Java DB",
      "New -> Persistence Unit: AssociationPU",
      "Create Department.java and Employee.java in package entity",
      "Create AssociationServlet.java and association.jsp"
    ],
    sql: null,
    files: [
      {
        name: "Department.java",
        language: "java",
        code: `package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

@Entity
@Table(name = "DEPARTMENT")
public class Department implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String deptName;

  @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Employee> employees = new ArrayList<Employee>();

  public Department() {}
  public Department(String deptName) { this.deptName = deptName; }

  public void addEmployee(Employee emp) {
    employees.add(emp);
    emp.setDepartment(this);
  }

  public Long getId() { return id; }
  public String getDeptName() { return deptName; }
  public List<Employee> getEmployees() { return employees; }
}`
      },
      {
        name: "Employee.java",
        language: "java",
        code: `package entity;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name = "EMPLOYEE")
public class Employee implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String empName;
  private double salary;

  @ManyToOne
  @JoinColumn(name = "DEPT_ID")
  private Department department;

  public Employee() {}
  public Employee(String empName, double salary) {
    this.empName = empName;
    this.salary = salary;
  }

  public Long getId() { return id; }
  public String getEmpName() { return empName; }
  public double getSalary() { return salary; }
  public Department getDepartment() { return department; }
  public void setDepartment(Department department) { this.department = department; }
}`
      }
    ],
    keyPoints: [
      "mappedBy='department' specifies that the foreign key column is managed by the Employee class.",
      "@JoinColumn(name='DEPT_ID') creates the relational foreign key column in table EMPLOYEE.",
      "LEFT JOIN FETCH eagerly loads children to prevent LazyInitializationException in the view."
    ]
  },
  {
    id: "10C",
    title: "Hibernate Application to Store & Retrieve",
    category: "Hibernate",
    aim: "To persist and retrieve Employee records using Hibernate 4.3 with Java DB.",
    mentalModel: "Hibernate uses a SessionFactory built via HibernateUtil from hibernate.cfg.xml. Save with session.save(emp); retrieve with session.createQuery('FROM Employee').list().",
    flowSteps: [
      { step: "1", title: "Project Creation", desc: "New Web Application -> Check Hibernate 4.3.x" },
      { step: "2", title: "Crucial Step", desc: "Add Java DB Driver to Libraries (NetBeans leaves this out by default!)" },
      { step: "3", title: "Configuration", desc: "Configure hibernate.cfg.xml with Derby driver, dialect, and entity mapping" },
      { step: "4", title: "Execute CRUD", desc: "EmployeeServlet uses Session to save and query via HQL" }
    ],
    netbeansSteps: [
      "Services -> Java DB -> Create Database: employeedb (user: root, pass: root)",
      "New Project -> Java Web -> Check Hibernate 4.3.x",
      "Libraries -> Add Library -> Java DB Driver (CRITICAL)",
      "Configure hibernate.cfg.xml",
      "Create HibernateUtil.java in package util",
      "Create Employee.java (@Entity), EmployeeServlet.java, and employee.jsp"
    ],
    sql: null,
    files: [
      {
        name: "hibernate.cfg.xml",
        language: "xml",
        code: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC 
 "-//Hibernate/Hibernate Configuration DTD 3.0//EN" 
 "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
  <session-factory>
    <property name="hibernate.connection.driver_class">org.apache.derby.jdbc.ClientDriver</property>
    <property name="hibernate.connection.url">jdbc:derby://localhost:1527/employeedb;create=true</property>
    <property name="hibernate.connection.username">root</property>
    <property name="hibernate.connection.password">root</property>
    <property name="hibernate.dialect">org.hibernate.dialect.DerbyTenSevenDialect</property>
    <property name="hibernate.hbm2ddl.auto">update</property>
    <property name="hibernate.show_sql">true</property>
    <mapping class="entity.Employee"/>
  </session-factory>
</hibernate-configuration>`
      },
      {
        name: "HibernateUtil.java",
        language: "java",
        code: `package util;

import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

public class HibernateUtil {
  private static final SessionFactory sessionFactory;
  static {
    try {
      Configuration cfg = new Configuration().configure("hibernate.cfg.xml");
      ServiceRegistry reg = new StandardServiceRegistryBuilder().applySettings(cfg.getProperties()).build();
      sessionFactory = cfg.buildSessionFactory(reg);
    } catch (Throwable ex) {
      System.err.println("SessionFactory creation failed: " + ex);
      throw new ExceptionInInitializerError(ex);
    }
  }
  public static SessionFactory getSessionFactory() { return sessionFactory; }
  public static void shutdown() {
    if (sessionFactory != null && !sessionFactory.isClosed()) sessionFactory.close();
  }
}`
      }
    ],
    keyPoints: [
      "Always add Java DB Driver to Libraries when using Hibernate in NetBeans 8.2.",
      "Dialect for Derby: org.hibernate.dialect.DerbyTenSevenDialect.",
      "HQL queries operate on entity class names ('FROM Employee'), NOT SQL table names."
    ]
  }
];

export const quizQuestions = [
  {
    id: 1,
    question: "What is the key difference between RequestDispatcher forward() and include()?",
    options: [
      "forward() switches control entirely and discards source output; include() merges output alongside source output",
      "forward() runs on the client browser; include() runs on the server",
      "forward() destroys the session; include() preserves it",
      "forward() only works with JSPs; include() only works with Servlets"
    ],
    correct: 0,
    explanation: "forward() terminates processing in the calling servlet and forwards control to the target. include() invokes the target and inserts its generated markup into the caller's output stream."
  },
  {
    id: 2,
    question: "Which JDBC driver class is used for Java DB (Apache Derby) Network Server in NetBeans?",
    options: [
      "com.mysql.cj.jdbc.Driver",
      "org.apache.derby.jdbc.ClientDriver",
      "oracle.jdbc.driver.OracleDriver",
      "org.derby.jdbc.EmbeddedDriver"
    ],
    correct: 1,
    explanation: "For networked Java DB on port 1527, 'org.apache.derby.jdbc.ClientDriver' is used."
  },
  {
    id: 3,
    question: "When parsing a checkbox group with multiple checked values in a Servlet, which method must be used?",
    options: [
      "request.getParameter()",
      "request.getParameterValues()",
      "request.getCheckboxGroup()",
      "request.getAttribute()"
    ],
    correct: 1,
    explanation: "request.getParameterValues() returns a String[] containing all selected checkbox values with that input name."
  },
  {
    id: 4,
    question: "What is the primary difference between @Stateless and @Stateful session beans in EJB 3.x?",
    options: [
      "@Stateless does not retain conversational client state between calls; @Stateful retains instance state per client",
      "@Stateless can only run on GlassFish; @Stateful can run on Tomcat",
      "@Stateless requires database connection; @Stateful does not",
      "@Stateless creates only one instance globally; @Stateful creates unlimited"
    ],
    correct: 0,
    explanation: "@Stateless beans are pooled and interchangeable with no client state. @Stateful beans remain dedicated to a specific client session."
  },
  {
    id: 5,
    question: "How do you invalidate (destroy) an HttpSession in a logout servlet?",
    options: [
      "session.close()",
      "session.destroy()",
      "session.invalidate()",
      "session.removeAttribute('ALL')"
    ],
    correct: 2,
    explanation: "session.invalidate() unbinds all objects bound to the session and marks it expired."
  },
  {
    id: 6,
    question: "In NetBeans 8.2, why do students often get ClassNotFoundException with Hibernate and Java DB?",
    options: [
      "NetBeans forgets to create web.xml",
      "NetBeans bundles Hibernate JARs but omits the Java DB Driver from project libraries by default",
      "GlassFish does not support Hibernate",
      "Java DB port is blocked by firewall"
    ],
    correct: 1,
    explanation: "NetBeans automatically adds Hibernate libraries when selected, but the user must manually right-click Libraries -> Add Library -> Java DB Driver."
  }
];

export const troubleshootingItems = [
  {
    error: "ClassNotFoundException: org.apache.derby.jdbc.ClientDriver",
    cause: "The Java DB Derby Client JAR is not included in the project classpath.",
    solution: "In NetBeans Projects tab, right-click the 'Libraries' folder -> Click 'Add Library...' -> Scroll down and select 'Java DB Driver' -> Click 'Add Library'."
  },
  {
    error: "SQLNonTransientConnectionException: Connection refused (port 1527)",
    cause: "The Java DB (Derby) database server is currently stopped.",
    solution: "Open Services tab (Ctrl + 5) -> Expand Databases -> Right-click 'Java DB' -> Click 'Start Server'. Verify port 1527 is listening in output."
  },
  {
    error: "HTTP 404 Not Found on form submit",
    cause: "Mismatch between form action attribute and servlet urlPattern or web.xml mapping.",
    solution: "Verify form action='MyServlet' matches exactly with @WebServlet('/MyServlet') in the Java class or <url-pattern>/MyServlet</url-pattern> in web.xml."
  },
  {
    error: "JSTL tags (<c:forEach>, <c:if>) display as raw unrendered text",
    cause: "Missing JSTL 1.2 library or missing <%@ taglib %> directive at top of JSP.",
    solution: "1. Add JSTL 1.2 to Libraries (Right-click Libraries -> Add Library -> JSTL 1.2). 2. Add <%@taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%> at line 1 of the JSP."
  },
  {
    error: "NullPointerException when calling an @EJB injected bean",
    cause: "Application is running on a web container like Apache Tomcat that does not support EJB injection, or GlassFish failed to scan the package.",
    solution: "Deploy the project on GlassFish Server 4.1.1 (NOT Tomcat). Verify that the bean and servlet belong to the same project or Enterprise Application module."
  },
  {
    error: "NumberFormatException: null on Integer.parseInt()",
    cause: "HTML input name does not match the string inside request.getParameter().",
    solution: "Ensure <input type='number' name='age'> matches request.getParameter('age') with identical case."
  }
];
