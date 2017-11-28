/*Table User - User detail:*/

/*Add*/
select add_user_with_details('admin', '123', 'admin', 'Felipe', 'Tavera', 'lftavera@hotmail.com', 'http://google.com');
select add_user_and_detail_id('admin', '123', 'admin');
select add_user_and_detail_id('edit', '123', 'edit');
select add_user_and_detail_id('read', '123', 'read');

/*Update*/
select update_user_with_detail(1, 'admin', '123', 'admin', 'Felipe', 'Tavera', 'lftavera@hotmail.com', 'http://google.com');
select update_user_without_detail(1, 'admin', '123', 'admin');

/*Get*/
select * from get_user_by_username_password_with_detail('admin', '123');
select * from get_user_by_id_without_detail(1);
select * from get_user_by_id_with_detail(1);
select * from get_users_without_detail();
select * from get_users_with_detail();
SELECT setval('public.user_id_user_seq', 0, true);

select * from get_posts_with_detail_profile_photo_and_name();
select * from get_posts_with_detail_profile_photo_and_name_by_post_type(1);
select add_post_with_detail('Title', 1, 0, 'Message', 'http://google.com', '2017-11-24');


/*Function to Get Items*/

CREATE OR REPLACE FUNCTION get_posts_with_detail_profile_photo_and_name_by_post_type(post_type_param integer) 
	RETURNS TABLE(id_post integer, 
              	  title character varying, 
              	  id_user integer, 
              	  post_type integer,
              	  id_post_detail integer,
             	  message character varying,
             	  photo_url character varying,
             	  date_published character varying,
             	  profile_photo character varying,
             	  name character varying) AS $$
	SELECT pst.id_post, 
    		pst.title, 
            pst.id_user, 
            pst.post_type, 
            pst_dtl.id_post_detail, 
            pst_dtl.message, 
            pst_dtl.photo_url, 
            pst_dtl.date_published, 
            (SELECT profile_photo
			FROM "user" usr
			LEFT JOIN user_detail usr_dtl ON usr.id_user = usr_dtl.id_user
			WHERE usr.id_user = pst.id_user),
			(SELECT usr_dtl.name
			FROM "user" usr
			LEFT JOIN user_detail usr_dtl ON usr.id_user = usr_dtl.id_user
			WHERE usr.id_user = pst.id_user)
    		FROM post pst
			LEFT JOIN post_detail pst_dtl ON pst.id_post = pst_dtl.id_post
			WHERE pst.post_type = post_type_param
			ORDER BY pst_dtl.date_published DESC;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION add_post_with_detail(title_param character varying, 
												id_user_param integer,
												post_type_param integer,
												message_param character varying,
												photo_url_param character varying,
												date_published_param character varying) RETURNS boolean AS $func$ 	
BEGIN
	INSERT INTO post VALUES(default, title_param, id_user_param, post_type_param);
    IF FOUND THEN
      INSERT INTO post_detail VALUES(default, message_param, photo_url_param, (select currval('post_id_post_seq')), date_published_param);
      IF FOUND THEN
          RETURN TRUE;
       ELSE
          RETURN FALSE;
       END IF;
   ELSE
      RETURN FALSE;
   END IF;
END;
$func$ LANGUAGE plpgsql;