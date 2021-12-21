# JPA Many-To-Many 

Useful link: https://www.baeldung.com/jpa-many-to-many


## Infinite Serialize Problem

StackOverflow Error when the hibernate try to serialize object with an infinite loop
- To break the cycle, we need to ignore the serialized field at one side, usually NOT the owner side.  
- Also we have to override the `Object.hashCode()` method, because by default the `hashCode()` method takes all fields. 
So we have to exclude the "foreign entity" field at the Non-Owner side as well. 

Here is an example:

```java
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.base.Objects;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Data
@Entity
public class Student() {
    @Id
    private long id;

    // ... other fields
    @ManyToMany
    @JoinTable(
            name = "student_cource",
            joinColumns = @JoinColumn(table = "student", name = "student_id"),
            inverseJoinColumns = @JoinColumn(table = "course", name = "course_id")
    )
    private Set<Course> courses;
}

@Entity
@Getter
@Setter
public class Course() {
    @Id
    private long id;
    
    private String courseName;

    // ... other fields
    @ManyToMany(mappedBy = "courses")
    @JsonIgnore
    private Set<Student> students;

    @Override
    public int hashCode() {
        // not including Set<Student> students
        return Objects.hashCode(id, courseName);
    }
}
```
- The Non-Owner side should use `@Getter @Setter` instead of `@Data`. Because we need to override `hashCode()`
- @JsonIgnore breaks the serialization infinite loop. In result, the serialized JSON `Course` object would not have `students` field. 