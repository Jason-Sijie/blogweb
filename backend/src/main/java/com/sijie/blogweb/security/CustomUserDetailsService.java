package com.sijie.blogweb.security;

import com.sijie.blogweb.model.Privilege;
import com.sijie.blogweb.model.Role;
import com.sijie.blogweb.model.User;
import com.sijie.blogweb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("No user found with username: " + username);
        }

        return new CustomUserDetails(user, getGrantedAuthorities(user.getRoles()));
    }

    private Collection<GrantedAuthority> getGrantedAuthorities(Collection<Role> roles) {
        Set<Privilege> privileges = new HashSet<>();
        for (Role role: roles) {
            privileges.addAll(role.getPrivileges());
        }

        Set<GrantedAuthority> authorities = new HashSet<>();
        for (Privilege privilege: privileges) {
            authorities.add(new SimpleGrantedAuthority(privilege.getName()));
        }
        return authorities;
    }
}
