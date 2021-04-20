# JPA common Annotation

ORM requires mapping Java **POJO** class to DB **Table**. *JPA* provides abundant and robust annotations to complete the mapping. Here is an example of a JPA **Entity**.

```java
@Entity
@Table(name="STUDENT")
public class Student {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(name="STUDENT_NAME", length=50, nullable=false, unique=false)
    private String name;

    @Transient
    private Integer age;

    @Temporal(TemporalType.DATE)
    private Date birthDate;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    // other fields, getters and setters
}
```

## Entity
`@Entity` tells JPA to identify this class as an **Entity**.
- `@Entity(name = "student")`, by default the **entity name** is the same as the **class name**. But we can speicfy another name by assign the `Entity.name` field.
- Entity **must not** have a **no-arg constructor** and a **primary key**:

##Table
`@Table` specifies the **table name** in the database.
- If not specify `@Table` or not specify `@Table.name` field, JPA will use **class name** as **table name**
- `@Table(name="STUDENT", schema="SCHOOL")`

##Id
`@Id` defines the primary key.

`@GeneratedValue` specifies the strategy to generate pk
- `AUTO`: JPA choose the strategy for you
- `TABLE`:
- `SEQUENCE`:
- `IDENTITY`:


## Column

`@Column` defines the details of a column in DB.
- `@Column(name="STUDENT_NAME", length=50, nullable=false, unique=false)`


## Temporal

`@Temporal` maps a Java Date object.
- `@Temporal(TemporalType.TIMESTAMP)`: `java.sql.Timestamp`
- `@Temporal(TemporalType.DATE)`: `java.sql.Date`
- `@Temporal(TemporalType.TIME)`: `java.sql.Time`

## Text
```java
@Lob
public String body;
```
- `@Lob` by default maps Java `String` to MySQL `longtext`

```java
@Lob
@Column(columnDefinition="text")
public String body;
```
- If we want to specify **other MySQL string datatypes**, such as `text`, we can use `@Column(columnDefinition="text")`.
- change "text" to any string datatype we want.

## ColumnDefinition
It is very simple and robust. It just put the string after the corresponding DB Schema Field.
```java
@Column(columnDefinition="text NOT NULL COMMENT 'article body'")
public String body
```
```sql
    body text NOT NULL COMMENT 'article body',
```

## Default Value
Set it in the pojo class `Entity`.
```java
@Entity
public Class Student {
    // default value is "Jason"
    private String name = "Jason";
}
```

By ColumnDefinition
```java
@Column(columnDefinition="varchar(200) default 'Jason'")
private String name;
```