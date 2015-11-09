
  Connection conn = null;
  Statement stmt = null;
  ResultSet rs = null;
  String url = null;
  String user = null;
  String password = null;
  String sql = null;
  try {
   Class.forName("com.mysql.jdbc.Driver"); //加载mysq驱动
  } catch (ClassNotFoundException e) {
   System.out.println("驱动加载错误");
   e.printStackTrace();//打印出错详细信息
  }
  try {
  	//$dbh=new PDO('mysql:host=mysql5.000webhost.com;dbname=a1896209_NUSC','a1896209_NUSC','Smartcap.2014');  
   url = 
    "jdbc:mysql://mysql5.000webhost.com/a1896209_NUSC?user=a1896209_NUSC&password=Smartcap.2014&useUnicode=true&&characterEncoding=gb2312&autoReconnect = true";//简单写法：url = "jdbc:myqsl://localhost/test(数据库名)? user=root(用户)&password=yqs2602555(密码)";
   user = "a1896209_NUSC";
   password = "Smartcap.2014";
   conn = DriverManager.getConnection(url,user,password);
  } catch (SQLException e) {
   System.out.println("数据库链接错误");
   e.printStackTrace();
  }
  try {
   stmt = conn.createStatement();
    String sql1 = "INSERT INTO pill(pill_id,pill_name) VALUES ('X6e9', 'NAas5670');";
   //sql = "select * from dept";//dept这张表有deptno，deptname和age这三个字段
   stmt.executeQuery(sql1);//执行sql语句
   /*while(rs.next()) {
    System.out.print(rs.getInt("deptno") + "   ");
    System.out.print(rs.getString("deptname") + "   ");
    System.out.println(rs.getInt("age") + "   ");
   }*/
   String query = "insert into Photo(image_name,image_timestamp,storage_path,device_id,patient_id) values('"
                 + s_a[0] +  "','" + s_a[2]+ "','"+path+ "','" + s_a[3]+ "','" + s_a[4]+ "')";
    stmt.executeQuery(query);             
  } catch (SQLException e) {
   System.out.println("数据操作错误");
   e.printStackTrace();
  }
//关闭数据库
  try {
   if(rs != null) {
    rs.close();
    rs = null;
   }
   if(stmt != null) {
    stmt.close();
    stmt = null;
   }
   if(conn != null) {
    conn.close();
    conn = null;
   }
  } catch(Exception e) {
   System.out.println("数据库关闭错误");
   e.printStackTrace();
  }
