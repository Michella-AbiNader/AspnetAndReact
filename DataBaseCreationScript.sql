USE [master]
GO
/****** Object:  Database [Shopping_App]    Script Date: 09/12/2024 6:34:03 pm ******/
CREATE DATABASE [Shopping_App]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Shopping_App', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\Shopping_App.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Shopping_App_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\Shopping_App_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Shopping_App] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Shopping_App].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Shopping_App] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Shopping_App] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Shopping_App] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Shopping_App] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Shopping_App] SET ARITHABORT OFF 
GO
ALTER DATABASE [Shopping_App] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Shopping_App] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Shopping_App] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Shopping_App] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Shopping_App] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Shopping_App] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Shopping_App] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Shopping_App] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Shopping_App] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Shopping_App] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Shopping_App] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Shopping_App] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Shopping_App] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Shopping_App] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Shopping_App] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Shopping_App] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Shopping_App] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Shopping_App] SET RECOVERY FULL 
GO
ALTER DATABASE [Shopping_App] SET  MULTI_USER 
GO
ALTER DATABASE [Shopping_App] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Shopping_App] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Shopping_App] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Shopping_App] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Shopping_App] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Shopping_App] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Shopping_App', N'ON'
GO
ALTER DATABASE [Shopping_App] SET QUERY_STORE = ON
GO
ALTER DATABASE [Shopping_App] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Shopping_App]
GO
/****** Object:  Table [dbo].[cart]    Script Date: 09/12/2024 6:34:03 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cart](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[product_id] [bigint] NOT NULL,
	[shop_id] [bigint] NOT NULL,
	[quantity] [int] NOT NULL,
 CONSTRAINT [PK_cart] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category]    Script Date: 09/12/2024 6:34:03 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](20) NOT NULL,
	[image_url] [nvarchar](max) NULL,
 CONSTRAINT [PK_category] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[orders]    Script Date: 09/12/2024 6:34:03 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[product_id] [bigint] NOT NULL,
	[shop_id] [bigint] NOT NULL,
	[quantity] [int] NOT NULL,
	[location] [nvarchar](50) NOT NULL,
	[date_of_order] [datetime] NULL,
	[status] [nvarchar](20) NOT NULL,
 CONSTRAINT [PK_order] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[products]    Script Date: 09/12/2024 6:34:03 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[products](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](30) NOT NULL,
	[description] [nvarchar](100) NOT NULL,
	[price] [float] NOT NULL,
	[quantity] [int] NULL,
	[image_url] [nvarchar](100) NULL,
	[shop_id] [bigint] NOT NULL,
	[category_id] [bigint] NOT NULL,
 CONSTRAINT [PK_products] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[shops]    Script Date: 09/12/2024 6:34:03 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[shops](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[category] [nvarchar](50) NULL,
	[image_url] [varchar](100) NULL,
	[theme_color] [nvarchar](20) NULL,
	[user_id] [int] NOT NULL,
 CONSTRAINT [PK_shops] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 09/12/2024 6:34:03 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](50) NOT NULL,
	[first_name] [nvarchar](50) NOT NULL,
	[last_name] [nvarchar](50) NOT NULL,
	[password] [nvarchar](max) NOT NULL,
	[type] [nvarchar](20) NOT NULL,
	[token] [nvarchar](max) NULL,
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[cart] ON 

INSERT [dbo].[cart] ([id], [user_id], [product_id], [shop_id], [quantity]) VALUES (20, 41, 15, 6, 2)
SET IDENTITY_INSERT [dbo].[cart] OFF
GO
SET IDENTITY_INSERT [dbo].[category] ON 

INSERT [dbo].[category] ([id], [name], [image_url]) VALUES (17, N'Puzzles', N'')
INSERT [dbo].[category] ([id], [name], [image_url]) VALUES (18, N'Action figures', N'')
INSERT [dbo].[category] ([id], [name], [image_url]) VALUES (19, N'Spraying', N'')
INSERT [dbo].[category] ([id], [name], [image_url]) VALUES (20, N'Lawn Care', N'')
INSERT [dbo].[category] ([id], [name], [image_url]) VALUES (21, N'Garden Accessories', N'')
INSERT [dbo].[category] ([id], [name], [image_url]) VALUES (23, N'Necklaces', N'')
INSERT [dbo].[category] ([id], [name], [image_url]) VALUES (24, N'Watches', N'')
INSERT [dbo].[category] ([id], [name], [image_url]) VALUES (25, N'Fiction', N'')
INSERT [dbo].[category] ([id], [name], [image_url]) VALUES (26, N'Non-Fiction', N'')
INSERT [dbo].[category] ([id], [name], [image_url]) VALUES (27, N'Microwaves', N'')
INSERT [dbo].[category] ([id], [name], [image_url]) VALUES (28, N'Refrigerators', N'')
INSERT [dbo].[category] ([id], [name], [image_url]) VALUES (29, N'Ovens', N'')
INSERT [dbo].[category] ([id], [name], [image_url]) VALUES (30, N'Dishwashers', N'')
INSERT [dbo].[category] ([id], [name], [image_url]) VALUES (31, N'Board Games', N'')
SET IDENTITY_INSERT [dbo].[category] OFF
GO
SET IDENTITY_INSERT [dbo].[orders] ON 

INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (3, 41, 36, 10, 2, N'Beirut', CAST(N'2024-08-01T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (4, 42, 37, 10, 1, N'Tripoli', CAST(N'2024-08-02T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (5, 43, 38, 10, 3, N'Jounieh', CAST(N'2024-08-03T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (6, 41, 40, 10, 1, N'Saida', CAST(N'2024-08-05T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (7, 42, 41, 10, 2, N'Tyre', CAST(N'2024-08-10T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (8, 43, 42, 10, 1, N'Zahle', CAST(N'2024-08-11T00:00:00.000' AS DateTime), N'canceled')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (9, 41, 43, 10, 1, N'Beirut', CAST(N'2024-08-15T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (10, 42, 44, 10, 1, N'Byblos', CAST(N'2024-08-18T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (11, 43, 45, 10, 2, N'Jounieh', CAST(N'2024-08-20T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (12, 41, 46, 10, 1, N'Sidon', CAST(N'2024-08-25T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (13, 42, 47, 10, 3, N'Beirut', CAST(N'2024-08-28T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (14, 43, 48, 10, 1, N'Tripoli', CAST(N'2024-08-29T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (15, 41, 36, 10, 1, N'Jounieh', CAST(N'2024-09-01T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (16, 42, 37, 10, 2, N'Zahle', CAST(N'2024-09-05T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (17, 43, 38, 10, 1, N'Byblos', CAST(N'2024-09-08T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (18, 41, 36, 10, 2, N'Beirut', CAST(N'2024-01-15T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (19, 42, 37, 10, 1, N'Tripoli', CAST(N'2024-02-03T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (20, 43, 38, 10, 3, N'Jounieh', CAST(N'2024-03-10T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (21, 41, 40, 10, 1, N'Saida', CAST(N'2024-03-25T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (22, 42, 41, 10, 2, N'Tyre', CAST(N'2024-04-14T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (23, 43, 42, 10, 1, N'Zahle', CAST(N'2024-05-01T00:00:00.000' AS DateTime), N'canceled')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (24, 41, 43, 10, 1, N'Beirut', CAST(N'2024-05-11T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (25, 42, 44, 10, 1, N'Byblos', CAST(N'2024-06-18T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (26, 43, 45, 10, 2, N'Jounieh', CAST(N'2024-07-07T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (27, 41, 46, 10, 1, N'Sidon', CAST(N'2024-07-21T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (28, 41, 11, 6, 2, N'Beirut', CAST(N'2024-01-10T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (29, 42, 14, 6, 1, N'Tripoli', CAST(N'2024-02-20T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (30, 43, 15, 6, 3, N'Jounieh', CAST(N'2024-03-05T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (31, 41, 16, 6, 1, N'Saida', CAST(N'2024-04-22T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (32, 42, 17, 6, 2, N'Tyre', CAST(N'2024-05-12T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (33, 43, 70, 6, 1, N'Zahle', CAST(N'2024-06-18T00:00:00.000' AS DateTime), N'canceled')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (34, 41, 71, 6, 1, N'Beirut', CAST(N'2024-07-07T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (35, 42, 72, 6, 1, N'Byblos', CAST(N'2024-08-11T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (36, 43, 11, 6, 2, N'Jounieh', CAST(N'2024-09-03T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (37, 41, 14, 6, 1, N'Sidon', CAST(N'2024-09-20T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (38, 41, 15, 6, 1, N'Beirut', CAST(N'2024-01-22T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (39, 42, 16, 6, 2, N'Tripoli', CAST(N'2024-02-15T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (40, 43, 17, 6, 3, N'Jounieh', CAST(N'2024-03-12T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (41, 41, 70, 6, 1, N'Saida', CAST(N'2024-04-09T00:00:00.000' AS DateTime), N'canceled')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (42, 42, 71, 6, 2, N'Tyre', CAST(N'2024-05-25T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (43, 43, 72, 6, 1, N'Zahle', CAST(N'2024-06-07T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (44, 41, 11, 6, 2, N'Beirut', CAST(N'2024-07-14T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (45, 42, 14, 6, 1, N'Byblos', CAST(N'2024-08-29T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (46, 43, 15, 6, 1, N'Jounieh', CAST(N'2024-09-12T00:00:00.000' AS DateTime), N'delivered')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (47, 41, 16, 6, 3, N'Sidon', CAST(N'2024-09-23T00:00:00.000' AS DateTime), N'pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (48, 41, 35, 9, 1, N'sarba, ein bzil', CAST(N'2024-11-24T14:36:53.487' AS DateTime), N'Pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (49, 41, 34, 9, 2, N'sarba, ein bzil', CAST(N'2024-11-24T14:37:22.390' AS DateTime), N'Pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (50, 41, 26, 7, 2, N'sarba, ein bzil', CAST(N'2024-11-24T14:37:28.940' AS DateTime), N'Pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (51, 41, 24, 7, 3, N'sarba, ein bzil', CAST(N'2024-11-24T14:37:40.390' AS DateTime), N'Pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (52, 41, 34, 9, 2, N'abdelli, batroun', CAST(N'2024-11-24T14:49:58.563' AS DateTime), N'Pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (53, 41, 24, 7, 3, N'abdelli, batroun', CAST(N'2024-11-24T14:49:58.563' AS DateTime), N'Pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (54, 41, 26, 7, 2, N'abdelli, batroun', CAST(N'2024-11-24T14:49:58.563' AS DateTime), N'Pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (55, 41, 26, 7, 2, N'Batroun, abdelli', CAST(N'2024-11-24T14:51:16.657' AS DateTime), N'Pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (56, 41, 34, 9, 2, N'Batroun, abdelli', CAST(N'2024-11-24T14:51:16.657' AS DateTime), N'Pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (57, 41, 24, 7, 3, N'Batroun, abdelli', CAST(N'2024-11-24T14:51:16.660' AS DateTime), N'Pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (58, 41, 34, 9, 2, N'abdelli, batroun', CAST(N'2024-11-24T14:54:19.207' AS DateTime), N'Pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (59, 41, 24, 7, 3, N'abdelli, batroun', CAST(N'2024-11-24T14:54:19.210' AS DateTime), N'Pending')
INSERT [dbo].[orders] ([id], [user_id], [product_id], [shop_id], [quantity], [location], [date_of_order], [status]) VALUES (60, 41, 26, 7, 2, N'abdelli, batroun', CAST(N'2024-11-24T14:54:19.207' AS DateTime), N'Pending')
SET IDENTITY_INSERT [dbo].[orders] OFF
GO
SET IDENTITY_INSERT [dbo].[products] ON 

INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (11, N'SPIDERMAN', N'Spiderman figure (10cm tall)', 16, 0, N'https://thetoystorelb.com/files/base/portal/images/products/253221003.jpg', 6, 18)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (14, N'HOMELANDER', N'Homlander''s The Boys action figure', 13, 0, N'https://th.bing.com/th/id/OIP.wJieOSP9WEBBPxnGhzalIQHaIj?rs=1&pid=ImgDetMain', 6, 18)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (15, N'Levi', N'Levi from Attack on Titan action figure', 17, 0, N'https://th.bing.com/th/id/R.53d7807ed906dc472c45984701de6efa?rik=4aS%2f7ixYjsfy5Q&pid=ImgRaw&r=0', 6, 18)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (16, N'ASTRONAUT PUZZLE', N'ASTRONAUT 3D JIGSAW 150PC', 16, 0, N'https://thetoystorelb.com/files/base/portal/images/products/d20849.jpg', 6, 17)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (17, N'PALNETS PUZZLE', N'EARTH & MOON 3D JIGSAW 150PC', 19, 0, N'https://thetoystorelb.com/files/base/portal/images/products/d21059.jpg', 6, 17)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (19, N'Handle Sprayer', N'2L Small Manual Sprayer', 3, 0, N'https://th.bing.com/th/id/OIP.bdYx-Ov7pi2SBm_DZ1hjRQHaHa?rs=1&pid=ImgDetMain', 7, 19)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (20, N'20L Handle Sprayer', N'Blue Manual Sprayer - Capacity 20L ', 19, 0, N'https://th.bing.com/th/id/OIP.BMSLelil1Hg_qBKk9kch8wHaHa?rs=1&pid=ImgDetMain', 7, 19)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (23, N'Electric Lawn Mower', N'Cutting Width: 34cm / Rate Power: 1400W', 125, 0, N'https://th.bing.com/th/id/OIP.a7ChpZwj8j81ZHDR2crHTQHaHa?rs=1&pid=ImgDetMain', 7, 20)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (24, N'Garden Hose Kit', N'Garden Hose Kit with Accessories - 15 m', 11, 0, N'https://makhsoom.com/lb/storage/160000/148118/5c7f69bea6ec20cf909685f1c6b9cb81.jpg', 7, 21)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (25, N'Watering Bucket', N'Capacity: 5L / Colors: Blue, red, green', 7, 0, N'https://th.bing.com/th/id/OIP.FEueByu9s7lkqSniiIU0lwHaHh?rs=1&pid=ImgDetMain', 7, 21)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (26, N' Rake For Olive Crop', N'Olive rake 9 teeth - cm. 14. Attachment for conical handle diam. 26 mm', 3, 0, N'https://th.bing.com/th/id/R.e3dd7137ec8c6e71bd833455b240c7d8?rik=z7LeYAuQ53Pwhw&pid=ImgRaw&r=0', 7, 21)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (27, N'Gold & Pearl Necklace', N'Glod and Pearl necklace', 180, 0, N'https://th.bing.com/th/id/OIP.UwRk9dq-kqwOTPECkkep2gHaIM?rs=1&pid=ImgDetMain', 8, 23)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (28, N'Flame Diamonds', N'Flame diamond necklace', 443, 0, N'https://th.bing.com/th/id/OIP.CCw6w7ba27V2hNVP1WjFaQHaHa?w=500&h=500&rs=1&pid=ImgDetMain', 8, 23)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (30, N'Pearl Necklace', N'Vintage Pearl Necklace', 230, 0, N'https://th.bing.com/th/id/OIP.ORQBQhi1gk5QWXXxSvH11gHaHa?w=580&h=580&rs=1&pid=ImgDetMain', 8, 23)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (31, N'Silver Watch', N'42mm silver watch', 66, 0, N'https://th.bing.com/th/id/OIP.mcZizVSh8062SEneI-wn6wHaHa?w=1000&h=1000&rs=1&pid=ImgDetMain', 8, 24)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (32, N'Golden Watch', N'Golden quartz watch for men', 420, 0, N'https://th.bing.com/th/id/OIP.12e1O5oR5IGpi-UWFwGT_AHaHa?rs=1&pid=ImgDetMain', 8, 24)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (33, N'Watch Leatehr', N'Emmerdale green watch leather', 37, 0, N'https://th.bing.com/th/id/OIP.12e1O5oR5IGpi-UWFwGT_AHaHa?rs=1&pid=ImgDetMain', 8, 24)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (34, N'Dune', N'The novel follows Ducal heir Paul Atreides during his rise to power on the futuristic desert world.', 36, 0, N'https://th.bing.com/th/id/OIP.cvoSdGRO8TtT-zw5N0qAAQHaLL?rs=1&pid=ImgDetMain', 9, 25)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (35, N'Youre Good to Go', N'Youre Good to Go An end of life and cremation journal', 13, 0, N'https://www.booksvenue.com/media/import/IMG_BKLST/ftp.ingramcontent.com/IMG_BKLST/9781794690448.jpg', 9, 26)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (36, N'Stainless Steel Dishwasher', N'Ariston LFC2B19X Freestanding Dishwasher Stainless Steel', 629, 0, N'https://beytech.com.lb/wp-content/uploads/2024/02/Ariston-LFC-2B19-X.jpg', 10, 30)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (37, N'Hisense Dishwacher', N'Hisense HS622E90W Dishwasher 13 Settings White', 365, 0, N'https://beytech.com.lb/wp-content/uploads/2023/05/HS622E90W.jpg', 10, 30)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (38, N'Built-In Dishwasher', N'Hoover 2L360PB Built-In Dishwasher 13 place settings', 445, 0, N'https://beytech.com.lb/wp-content/uploads/2023/01/HD1N-2L360PB-3.jpg', 10, 30)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (40, N'Built-in Gas Oven 60 cm', N'Fresh O60FGB Built-in Gas Oven 60 cm', 215, 0, N'https://beytech.com.lb/wp-content/uploads/2022/08/Built-in-Black-2-nop.jpg', 10, 29)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (41, N'Gas Electric Oven 60 cm', N'Sensus FGE2TIXW Gas Electric Oven 60 cm White', 329, 0, N'https://beytech.com.lb/wp-content/uploads/2020/07/SNSWBOVNFGE2TIXW.jpg', 10, 29)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (42, N'Built-in Gas Oven Black', N'Simfer B6102.TGRSP Built-in Gas Oven Black', 390, 0, N'https://beytech.com.lb/wp-content/uploads/2022/12/Simfer-Oven-4.jpg', 10, 29)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (43, N'Microwave Oven 700w', N'Kenwood MWM20.000WH 20l Microwave Oven 700w White', 99, 0, N'https://beytech.com.lb/wp-content/uploads/2023/02/266028.jpg', 10, 27)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (44, N'Built-In Microwave ', N'Bosch BFL524MSO Serie 6 Built-In Microwave 60 x 38 cm', 777, 0, N'https://beytech.com.lb/wp-content/uploads/2023/05/BFL524MSO-1.jpg', 10, 27)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (45, N'Built-In Solo Microwave', N'Samsung MS22M8254AK/E3 Built-In Solo Microwave, 22L, Black', 311, 0, N'https://beytech.com.lb/wp-content/uploads/2023/05/MS22M8254AKE3-2.jpg', 10, 27)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (46, N'French Door Refrigerator', N'Big Chef FD600 French Door Refrigerator', 795, 0, N'https://beytech.com.lb/wp-content/uploads/2023/07/FD-600-closed-1.jpg', 10, 28)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (47, N'Refrigerator Inverter', N'Haier HRF-567 Top Mount Refrigerator Inverter White 20 CFT', 545, 0, N'https://beytech.com.lb/wp-content/uploads/2023/11/HRF-567WH.jpg', 10, 28)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (48, N'Four Doors Refrigerator', N'Haier HTF-610DM7 Four Doors Refrigerator Stainless Steel 716L', 1599, 0, N'https://beytech.com.lb/wp-content/uploads/2020/07/HAIWREFHTF610DM7-2-1.jpg', 10, 28)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (49, N'LG Fridge', N'LG Fridge GNM-732HLI 547 Liters Silver', 749, 0, N'https://aghasarkissian.com/wp-content/uploads/2024/03/GNM-732HLL-IMAGE-MAIN-1.jpg', 11, 28)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (50, N'AEG Fridge', N'AEG Fridge Built-in Single Door SKE81811DC', 1599, 0, N'https://aghasarkissian.com/wp-content/uploads/2021/04/AEG-SKE81811DC.jpg', 11, 28)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (51, N'Beko Fridge', N'Beko Fridge 22FT RDNE510M20W', 630, 0, N'https://aghasarkissian.com/wp-content/uploads/2022/11/BEKO-22.jpg', 11, 28)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (52, N'TEKA Dishwasher', N'TEKA TOTAL FULLY INTEGRATED DISHWASHER DFI 4670', 577, 0, N'http://rammalappliances.com/uploads/628324.png', 11, 30)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (53, N'LG Dishwasher', N'LG QuadWash™ Dishwasher, 14 Place Settings, EasyRack™ Plus, Inverter Direct Drive, ThinQ, SILVER', 780, 0, N'http://rammalappliances.com/uploads/485887.png', 11, 30)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (54, N'Electric Oven', N'Hausberg Electric Oven HB-8020 , 70L – 2000W – Turbo Fan ,Double Glass ,2500W', 520, 0, N'http://rammalappliances.com/uploads/711501.png', 11, 29)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (55, N'MICROWAVE SILVER ', N'MICROWAVE SILVER LINE  32 LT INOX GRIL L+  CONVECTIO', 324, 0, N'http://rammalappliances.com/uploads/123666.jpg', 11, 27)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (56, N'MICROWAVE $ GRILL', N'MICROWAVE SILVER LINE  25 LT  BLACK + GRILL', 759, 0, N'http://rammalappliances.com/uploads/111358.jpg', 11, 27)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (57, N'Oven 90CM', N'MS95C81AN- COOKER LAGERMANIA 90cm', 233, 0, N'http://rammalappliances.com/uploads/725942.jpg', 11, 29)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (58, N'BUILT-IN OVEN', N'AMS95C81AX- COOKER LAGERMANIA BUILT-IN 90cm', 214, 0, N'http://rammalappliances.com/uploads/471536.jpg', 11, 29)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (70, N'CATAN Board Game ', N'Ages 10+ | for 3 to 4 Players | Average Playtime 60 Minutes ', 23, 0, N'https://m.media-amazon.com/images/I/81zZW70yiYL._AC_SX569_.jpg', 6, 31)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (71, N'MONOPOLY', N'2-8 players | 60-180 playing minutes', 25, 0, N'https://th.bing.com/th/id/R.6d574b84f0d68191728fb27f9bbac648?rik=5z8n40UlR8%2biRg&pid=ImgRaw&r=0', 6, 31)
INSERT [dbo].[products] ([id], [name], [description], [price], [quantity], [image_url], [shop_id], [category_id]) VALUES (72, N'BATTLE SHIP', N'2 Players | 7+', 17, 12, N'https://th.bing.com/th/id/OIP.viK8AOLNsM2spJH9aNCwmQAAAA?rs=1&pid=ImgDetMain', 6, 31)
SET IDENTITY_INSERT [dbo].[products] OFF
GO
SET IDENTITY_INSERT [dbo].[shops] ON 

INSERT [dbo].[shops] ([id], [name], [category], [image_url], [theme_color], [user_id]) VALUES (6, N'The Toy Store', N'Toys & Games', N'https://th.bing.com/th/id/OIP.P2mgWRlKsZ9Lj948Ug5ZPQHaGA?w=224&h=182&c=7&r=0&o=5&pid=1.7', N'#22316c', 34)
INSERT [dbo].[shops] ([id], [name], [category], [image_url], [theme_color], [user_id]) VALUES (7, N'Gardenium', N'Agriculture', N'https://th.bing.com/th/id/OIF.WIThBRETifkwM6Gw8Rub0A?rs=1&pid=ImgDetMain', N'#0e4f2f', 35)
INSERT [dbo].[shops] ([id], [name], [category], [image_url], [theme_color], [user_id]) VALUES (8, N'Journey Jewerly', N'Jewerly & Accessories', N'https://th.bing.com/th/id/OIP.0tcJY_Z8Hn34Xf6D4l8K_QHaHa?rs=1&pid=ImgDetMain', N'#211f20', 36)
INSERT [dbo].[shops] ([id], [name], [category], [image_url], [theme_color], [user_id]) VALUES (9, N'Tell Tales Bookshop', N'Books', N'https://th.bing.com/th/id/OIP.fuihNHSEt1Dx_EUk4XvSyAHaHa?rs=1&pid=ImgDetMain', N'#7cedd4', 37)
INSERT [dbo].[shops] ([id], [name], [category], [image_url], [theme_color], [user_id]) VALUES (10, N'BeyTech', N'Home Appliances', N'https://th.bing.com/th/id/OIP.mDt8YbAwyTzSlGC1PDTUpgAAAA?rs=1&pid=ImgDetMain', N'#b62525', 38)
INSERT [dbo].[shops] ([id], [name], [category], [image_url], [theme_color], [user_id]) VALUES (11, N'General Electric', N'Home Appliances', N'https://th.bing.com/th/id/R.77b4fa4f34026f2d291c0008a5de5ec3?rik=nXI3v5dQMt%2bMAQ&pid=ImgRaw&r=0', N'#386eb6', 39)
SET IDENTITY_INSERT [dbo].[shops] OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([id], [username], [first_name], [last_name], [password], [type], [token]) VALUES (27, N'admin2', N'micha', N'micha', N'1c142b2d01aa34e9a36bde480645a57fd69e14155dacfab5a3f9257b77fdc8d8', N'admin', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNyIsInVzZXJuYW1lIjoiYWRtaW4yIiwidHlwZSI6ImFkbWluIn0.Mwoo2477lZa_wakvbXrDnTpgipUbA-W3VQRyqurf_BI')
INSERT [dbo].[users] ([id], [username], [first_name], [last_name], [password], [type], [token]) VALUES (34, N'Toy store', N'Toy', N'store', N'fb16956498d885ad22c7591cb353afdeb7470070159e147cab510a839a5e5b89', N'shop admin', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNCIsInVzZXJuYW1lIjoiVG95IHN0b3JlIiwidHlwZSI6InNob3AgYWRtaW4ifQ.Cx8IKLWqN1tKZAUT91e0xZ_4MqNEA6t2D9bY133jUVo')
INSERT [dbo].[users] ([id], [username], [first_name], [last_name], [password], [type], [token]) VALUES (35, N'Garden Care', N'Garden', N'Care', N'33842acec77021a9e4682143a69ae7b118dcb0363f486c792a1581a12f62c536', N'shop admin', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNSIsInVzZXJuYW1lIjoiR2FyZGVuIENhcmUiLCJ0eXBlIjoic2hvcCBhZG1pbiJ9.5baPYluA4WqKbDFKFnmIiLOAuQSIhV5uys8mjoJOEHc')
INSERT [dbo].[users] ([id], [username], [first_name], [last_name], [password], [type], [token]) VALUES (36, N'Journey', N'Journey', N'Jewrly', N'1cd63f5724cd33bc51a52d8d7c049d7c022c8823b6011847caa9484e2a485666', N'shop admin', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNiIsInVzZXJuYW1lIjoiSm91cm5leSIsInR5cGUiOiJzaG9wIGFkbWluIn0.HxS8nzpGHJL7pWrXfmIoU2X3gIWT2M7ur3-fn7nZuS0')
INSERT [dbo].[users] ([id], [username], [first_name], [last_name], [password], [type], [token]) VALUES (37, N'TellTales', N'Tell', N'tales', N'854e3e41591e51062a03580856c83da0456e170d503abd788c6cf493525d4c63', N'shop admin', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNyIsInVzZXJuYW1lIjoiVGVsbFRhbGVzIiwidHlwZSI6InNob3AgYWRtaW4ifQ.tZ69Yh5yOAaOSYh3XHLT3nTUM2mfeQsCyOeRYTDhDSc')
INSERT [dbo].[users] ([id], [username], [first_name], [last_name], [password], [type], [token]) VALUES (38, N'Beytech', N'beytech', N'beytech', N'e69447266583056357fdd39aaae8eb957678bdff4e8c6de9a11ed4efc715b986', N'shop admin', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzOCIsInVzZXJuYW1lIjoiQmV5dGVjaCIsInR5cGUiOiJzaG9wIGFkbWluIn0.2uMfJq9dbnEpujG2NUUbCLl6msmuz3r26Y_65RtSenc')
INSERT [dbo].[users] ([id], [username], [first_name], [last_name], [password], [type], [token]) VALUES (39, N'General electric', N'general', N'electric', N'305ea2fe3217b924cb51445451e6ebfa143d0bf4e0595fcf8ac438f2a88491d6', N'shop admin', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzOSIsInVzZXJuYW1lIjoiR2VuZXJhbCBlbGVjdHJpYyIsInR5cGUiOiJzaG9wIGFkbWluIn0.kakqb5Cdou6dRmLzI8g9XoMKMLNYzQF2JoH0BB96A8k')
INSERT [dbo].[users] ([id], [username], [first_name], [last_name], [password], [type], [token]) VALUES (40, N'Appliance Works', N'Appliance', N'Works', N'9a10171e47c9dcf9869da24c8aa64e345973b153d65c09671756a41a12cfb2e0', N'shop admin', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MCIsInVzZXJuYW1lIjoiQXBwbGlhbmNlIFdvcmtzIiwidHlwZSI6InNob3AgYWRtaW4ifQ.9J_lf7av-Au-gsUsZRDOlqPhmkiF2yZfVRQ9JBUmQ4I')
INSERT [dbo].[users] ([id], [username], [first_name], [last_name], [password], [type], [token]) VALUES (41, N'Micha', N'Michella', N'Abi Nader', N'a9b9745a0885b86e2b048f053c6d93bdbfe721263cc65709e3339639af8d5dd4', N'user', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MSIsInVzZXJuYW1lIjoiTWljaGEiLCJ0eXBlIjoidXNlciJ9.j-eMkrYEiE1-a_ofRD6csGrIqRcgF31iTyKdw8_fn8E')
INSERT [dbo].[users] ([id], [username], [first_name], [last_name], [password], [type], [token]) VALUES (42, N'Test', N'Testing', N'Continue', N'51fc1a850c1b08007d3a907eb6a2187f06175e01ac0fb9b44fcfc57b40593b9b', N'user', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MiIsInVzZXJuYW1lIjoiVGVzdCIsInR5cGUiOiJ1c2VyIn0.Ddyoxs4aJtUxsI_ZZy6QOnN0PCaf0pTCQMDo9LgttfU')
INSERT [dbo].[users] ([id], [username], [first_name], [last_name], [password], [type], [token]) VALUES (43, N'jess', N'Jessica', N'F.J', N'61ff7b7a35f882759fa89e728a554b4fe716acf3310ff09499cdab410861b68d', N'user', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MyIsInVzZXJuYW1lIjoiamVzcyIsInR5cGUiOiJ1c2VyIn0.-wlXuHZkZRSsGj3JvVNggueS9IIg4ngEVJGLBkVUAQY')
SET IDENTITY_INSERT [dbo].[users] OFF
GO
/****** Object:  Index [Index_cart_1]    Script Date: 09/12/2024 6:34:04 pm ******/
CREATE UNIQUE NONCLUSTERED INDEX [Index_cart_1] ON [dbo].[cart]
(
	[shop_id] ASC,
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [Index_category_1]    Script Date: 09/12/2024 6:34:04 pm ******/
CREATE UNIQUE NONCLUSTERED INDEX [Index_category_1] ON [dbo].[category]
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_users]    Script Date: 09/12/2024 6:34:04 pm ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_users] ON [dbo].[users]
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[cart]  WITH CHECK ADD  CONSTRAINT [FK_cart_products] FOREIGN KEY([product_id])
REFERENCES [dbo].[products] ([id])
GO
ALTER TABLE [dbo].[cart] CHECK CONSTRAINT [FK_cart_products]
GO
ALTER TABLE [dbo].[cart]  WITH CHECK ADD  CONSTRAINT [FK_cart_shops_1] FOREIGN KEY([shop_id])
REFERENCES [dbo].[shops] ([id])
GO
ALTER TABLE [dbo].[cart] CHECK CONSTRAINT [FK_cart_shops_1]
GO
ALTER TABLE [dbo].[cart]  WITH CHECK ADD  CONSTRAINT [FK_cart_users_2] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[cart] CHECK CONSTRAINT [FK_cart_users_2]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FK_order_products] FOREIGN KEY([product_id])
REFERENCES [dbo].[products] ([id])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FK_order_products]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FK_order_shops_1] FOREIGN KEY([shop_id])
REFERENCES [dbo].[shops] ([id])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FK_order_shops_1]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD  CONSTRAINT [FK_order_users_2] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[orders] CHECK CONSTRAINT [FK_order_users_2]
GO
ALTER TABLE [dbo].[products]  WITH CHECK ADD  CONSTRAINT [FK_products_category_1] FOREIGN KEY([category_id])
REFERENCES [dbo].[category] ([id])
GO
ALTER TABLE [dbo].[products] CHECK CONSTRAINT [FK_products_category_1]
GO
ALTER TABLE [dbo].[products]  WITH CHECK ADD  CONSTRAINT [FK_products_shops] FOREIGN KEY([shop_id])
REFERENCES [dbo].[shops] ([id])
GO
ALTER TABLE [dbo].[products] CHECK CONSTRAINT [FK_products_shops]
GO
ALTER TABLE [dbo].[shops]  WITH CHECK ADD  CONSTRAINT [FK_shops_users] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[shops] CHECK CONSTRAINT [FK_shops_users]
GO
USE [master]
GO
ALTER DATABASE [Shopping_App] SET  READ_WRITE 
GO
