
  Connection conn = null;
  Statement stmt = null;
  ResultSet rs = null;
  String url = null;
  String user = null;
  String password = null;
  String sql = null;
  try {
   Class.forName("com.mysql.jdbc.Driver"); //����mysq����
  } catch (ClassNotFoundException e) {
   System.out.println("�������ش���");
   e.printStackTrace();//��ӡ������ϸ��Ϣ
  }
  try {
  	//$dbh=new PDO('mysql:host=mysql5.000webhost.com;dbname=a1896209_NUSC','a1896209_NUSC','Smartcap.2014');  
   url = 
    "jdbc:mysql://mysql5.000webhost.com/a1896209_NUSC?user=a1896209_NUSC&password=Smartcap.2014&useUnicode=true&&characterEncoding=gb2312&autoReconnect = true";//��д����url = "jdbc:myqsl://localhost/test(���ݿ���)? user=root(�û�)&password=yqs2602555(����)";
   user = "a1896209_NUSC";
   password = "Smartcap.2014";
   conn = DriverManager.getConnection(url,user,password);
  } catch (SQLException e) {
   System.out.println("���ݿ����Ӵ���");
   e.printStackTrace();
  }
  try {
   stmt = conn.createStatement();
    String sql1 = "INSERT INTO pill(pill_id,pill_name) VALUES ('X6e9', 'NAas5670');";
   //sql = "select * from dept";//dept���ű���deptno��deptname��age�������ֶ�
   stmt.executeQuery(sql1);//ִ��sql���
   /*while(rs.next()) {
    System.out.print(rs.getInt("deptno") + "   ");
    System.out.print(rs.getString("deptname") + "   ");
    System.out.println(rs.getInt("age") + "   ");
   }*/
   String query = "insert into Photo(image_name,image_timestamp,storage_path,device_id,patient_id) values('"
                 + s_a[0] +  "','" + s_a[2]+ "','"+path+ "','" + s_a[3]+ "','" + s_a[4]+ "')";
    stmt.executeQuery(query);             
  } catch (SQLException e) {
   System.out.println("���ݲ�������");
   e.printStackTrace();
  }
//�ر����ݿ�
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
   System.out.println("���ݿ�رմ���");
   e.printStackTrace();
  }
